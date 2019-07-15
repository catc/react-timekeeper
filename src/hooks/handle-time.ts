import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import debounce from 'lodash.debounce'

import { parseTime, composeTime, parseMeridiem } from '../helpers/time'
import { TimeInput, ChangeTimeFn, Time } from '../helpers/types'
import { MODE } from '../helpers/constants'

/*
	responsible for managing time state for this component
	and updating parent on change
*/
export default function useHandleTime(
	parentTime: TimeInput,
	onChange: ChangeTimeFn,
	mode: MODE,
	is24HourMode: boolean,
) {
	// need meridiem for context when 12h mode, so can tell
	// if user is changing hours before or after 12pm
	const [meridiem, setMeridiem] = useState(() => parseMeridiem(parentTime))
	const [time, setTime] = useState(() => {
		return parseTime(parentTime)
	})

	// update 24 hour time on meridiem change
	function updateMeridiem(newMeridiem: string) {
		if (meridiem === newMeridiem) {
			return
		}
		const newTime: Time = { minute: time.minute, hour: 0 }
		setMeridiem(newMeridiem)
		if (newMeridiem === 'am') {
			newTime.hour = time.hour - 12
			actuallySetTime(newTime)
		} else if (newMeridiem === 'pm') {
			newTime.hour = time.hour + 12
			actuallySetTime(newTime)
		}
	}

	// handle time update if parent changes
	useEffect(() => {
		const parsed = parseTime(parentTime)
		setTime(parsed)
		if (!is24HourMode) {
			setMeridiem(parseMeridiem(parentTime))
		}
	}, [is24HourMode, mode, parentTime])

	// minor pre-optimization - only run `composeTime`
	// when about to actually update time on parent
	const refTime = useRef(time)
	const debounceUpdateParent = useMemo(() => {
		if (typeof onChange === 'function') {
			return debounce(() => {
				const time = refTime.current
				onChange(composeTime(time.hour, time.minute))
			}, 80)
		}
		return () => {}
	}, [onChange])

	// update time on component and then on parent
	function actuallySetTime(newTime: Time) {
		// set time on timekeeper
		setTime(newTime)
		refTime.current = newTime

		// set time on parent
		debounceUpdateParent()
	}

	/*
		- calls time update on component and parent
		- handles any mode switching or closing
	*/
	const updateTime = (val: number) => {
		// TODO - is this necessary?
		// val = parseInt(val, 10)
		// if (isNaN(val)) {
		// 	console.error('DEBUG :: NOT A NUMBER!')
		// 	return
		// }

		// const increments = CLOCK_VALUES[mode].increments
		let unit: 'hour' | 'minute'
		switch (mode) {
			case MODE.HOURS_24:
				unit = 'hour'
				if (val === 24) {
					val = 0
				}
				break
			case MODE.HOURS_12:
				unit = 'hour'
				if (val === 12) {
					val = 0
				}
				if (meridiem === 'pm') {
					val += 12
				}
				break
			case MODE.MINUTES:
				unit = 'minute'
				if (val === 60) {
					val = 0
				}
				break
			default:
				unit = 'hour'
		}

		// generate new time and update timekeeper state
		const newTime: Time = { ...time, [unit]: val }
		actuallySetTime(newTime)
	}

	return {
		time,
		updateTime,
		updateMeridiem,
	}
}
