import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import debounce from 'lodash.debounce'

import { parseTime, composeTime } from '../helpers/time'
import { TimeInput, ChangeTimeFn } from '../helpers/types'

/*
	responsible for managing time state for this component
	and updating parent on change
*/
export default function useHandleTime(parentTime: TimeInput, onChange: ChangeTimeFn) {
	const [time, setTime] = useState(parseTime(parentTime))

	// handle time update if parent changes
	useEffect(() => {
		const parsed = parseTime(parentTime)
		setTime(parsed)
	}, [parentTime])

	// minor pre-optimization - allows to compose time
	// only when about to update on parent
	const refTime = useRef(time)

	const debounceUpdateParent = useMemo(() => {
		if (typeof onChange === 'function') {
			return debounce(() => {
				const time = refTime.current
				onChange(composeTime(time.hour, time.minute, 'pm'))
			}, 80)
		}
		return () => {}
	}, [onChange])

	// update time on component and then on parent
	const updateTime = useCallback(
		(newTime) => {
			// set time on timekeeper
			setTime(newTime)
			refTime.current = newTime

			// set time on parent
			debounceUpdateParent()
		},
		[debounceUpdateParent],
	)

	return {
		time,
		setTime: updateTime, // TODO - rename
	}
}
