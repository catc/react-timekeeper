import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import debounce from 'lodash.debounce'

import { parseTime, composeTime } from '../helpers/time'
import { TimeInput, ChangeTimeFn, Time } from '../helpers/types'
import { MODE } from '../helpers/constants'

/*
	responsible for managing time state for this component
	and updating parent on change
*/
export default function useHandleTime(parentTime: TimeInput, onChange: ChangeTimeFn, mode: MODE) {
	const [time, setTime] = useState(parseTime(parentTime))

	// handle time update if parent changes
	useEffect(() => {
		const parsed = parseTime(parentTime)
		setTime(parsed)
	}, [parentTime])

	// minor pre-optimization - allows to compose time
	// only when actually about to update on parent (prolly unnecessary)
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
	const actuallySetTime = useCallback(
		(newTime) => {
			// set time on timekeeper
			setTime(newTime)
			refTime.current = newTime

			// set time on parent
			debounceUpdateParent()
		},
		[debounceUpdateParent],
	)

	/*
		- calls time update on component and parent
		- handles any mode switching or closing
	*/
	const updateTime = useCallback(
		(val: number) => {
			// TODO - is this necessary?
			// val = parseInt(val, 10)
			// if (isNaN(val)) {
			// 	console.error('DEBUG :: NOT A NUMBER!')
			// 	return
			// }

			// const increments = CLOCK_VALUES[mode].increments
			let unit: 'hour' | 'minute'
			switch (mode) {
				// TODO - finish adding support for 24 hrs
				case MODE.HOURS_24:
					unit = 'hour'
					if (val === 24) {
						val = 0
					}
					break
				case MODE.HOURS_12:
					unit = 'hour'
					if (val === 0) {
						val = 12
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
		},
		[actuallySetTime, mode, time],
	)

	return {
		time,
		updateTime,
	}
}
