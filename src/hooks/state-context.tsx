import React, {
	useRef,
	useMemo,
	useReducer,
	useEffect,
	useState,
	useContext,
	createContext,
	ReactElement,
	useCallback,
} from 'react'
import debounce from 'lodash.debounce'

import { parseTime, composeTime, parseMeridiem } from '../helpers/time'
import useConfig from '../hooks/config'
import { isHourMode, isMinuteMode } from '../helpers/utils'
import { TimeInput, ChangeTimeFn, Time } from '../helpers/types'
import { MODE, CLOCK_VALUES, MERIDIEM } from '../helpers/constants'

interface Props {
	time: TimeInput
	onChange: ChangeTimeFn
	children: ReactElement
}

interface GlobalState {
	time: Time
	mode: MODE
	meridiem: MERIDIEM
}

interface StateContext {
	time: Time
	mode: MODE
	updateTime: (val: number, canAutoChangeUnit: boolean) => void
	updateMeridiem: (meridiem: MERIDIEM) => void
	setMode: (mode: MODE) => void
}

const stateContext = createContext({})

function reducer(state: GlobalState, action: any) {
	switch (action.type) {
		case 'SET_TIME':
			return { ...state, time: action.time, meridiem: action.meridiem || state.meridiem }
		case 'SET_MODE':
			return { ...state, mode: action.mode }
		case 'SET_MERIDIEM':
			return { ...state, meridiem: action.meridiem }
	}
	return state
}

export function StateProvider({ onChange, time: parentTime, children }: Props) {
	const config = useConfig()
	const [state, dispatch] = useReducer(reducer, null, () => {
		return {
			time: parseTime(parentTime),
			mode: config.hour24Mode ? MODE.HOURS_24 : MODE.HOURS_12,
			// need meridiem for context when 12h mode, so can tell
			// if user is changing hours before or after 12pm
			meridiem: parseMeridiem(parentTime),
		}
	})
	const { mode, time, meridiem } = state

	// handle time update if parent changes
	useEffect(() => {
		const action: any = { type: 'SET_TIME', time: parseTime(parentTime) }
		if (!config.hour24Mode) {
			action.meridiem = parseMeridiem(parentTime)
		}
		dispatch(action)
	}, [config.hour24Mode, mode, parentTime])

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

	// update 24 hour time on meridiem change
	function updateMeridiem(newMeridiem: MERIDIEM) {
		if (meridiem === newMeridiem) {
			return
		}
		const newTime: Time = { minute: time.minute, hour: 0 }
		if (newMeridiem === 'am') {
			newTime.hour = time.hour - 12
		} else if (newMeridiem === 'pm') {
			newTime.hour = time.hour + 12
		}
		_actuallySetTime(newTime, newMeridiem)
	}

	// update time on component and then on parent
	function _actuallySetTime(newTime: Time, meridiem?: MERIDIEM) {
		// update component global state
		dispatch({ type: 'SET_TIME', time: newTime, meridiem: meridiem })
		refTime.current = newTime

		// update time on parent
		debounceUpdateParent()
	}

	function updateTime(val: number, canAutoChangeUnit: boolean) {
		// account for max number being 12 during 12h mode
		if (mode === MODE.HOURS_12 && meridiem === 'pm') {
			val += 12
		}

		// generate new time and update timekeeper state
		const unit = isHourMode(mode) ? 'hour' : 'minute'
		const newTime: Time = { ...time, [unit]: val }
		_actuallySetTime(newTime)

		// handle any unit autochanges or closeos
		if (canAutoChangeUnit) {
			_handleTimeUpdateSideEffects()
		}
	}

	function _handleTimeUpdateSideEffects() {
		if (config.switchToMinuteOnHourSelect && isHourMode(mode)) {
			dispatch({ type: 'SET_MODE', mode: MODE.MINUTES })
		} else if (config.closeOnMinuteSelect && isMinuteMode(mode)) {
			config.onDoneClick && config.onDoneClick()
		}
	}

	const setMode = useCallback((mode: MODE) => {
		dispatch({ type: 'SET_MODE', mode })
	}, [])

	// TODO - memoize?
	const value = {
		time: state.time,
		mode: state.mode,
		updateTime,
		updateMeridiem,
		setMode,
	}

	return <stateContext.Provider value={value}>{children}</stateContext.Provider>
}

export default function useTimekeeperState(): StateContext {
	return useContext(stateContext)
}
