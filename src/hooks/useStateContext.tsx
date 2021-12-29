import {
	useRef,
	useMemo,
	useReducer,
	useEffect,
	useContext,
	createContext,
	ReactElement,
	useCallback,
} from 'react'
import debounce from 'lodash.debounce'

import { parseTime, composeTime, parseMeridiem } from '../helpers/time'
import useConfig from './useConfigContext'
import { isHourMode, isMinuteMode, isSameTime } from '../helpers/utils'
import { TimeInput, ChangeTimeFn, Time, TimeOutput } from '../helpers/types'
import { MODE, MERIDIEM } from '../helpers/constants'
import DisabledTimeRange from '../helpers/disable-time'

interface Props {
	time?: TimeInput
	onChange?: ChangeTimeFn
	children: ReactElement
	disabledTimeRange?: null | { from: string; to: string }
}

interface GlobalState {
	time: Time
	mode: MODE
	meridiem: MERIDIEM
}

type UpdateTimeValueSource =
	| {
			type: 'clock'
			canAutoChangeMode: boolean
	  }
	| {
			type: 'dropdown'
	  }

interface StateContext {
	time: Time
	mode: MODE
	updateTimeValue: (val: number, source: UpdateTimeValueSource) => void
	updateMeridiem: (meridiem: MERIDIEM) => void
	setMode: (mode: MODE) => void
	getComposedTime: () => TimeOutput
	disabledTimeRangeValidator: DisabledTimeRange | null
	meridiem: MERIDIEM
}

export const stateContext = createContext({} as StateContext)

function reducer(state: GlobalState, action: any): GlobalState {
	switch (action.type) {
		case 'SET_TIME':
			return {
				...state,
				time: action.time,
				meridiem: action.meridiem || state.meridiem,
			}
		case 'SET_MODE':
			return { ...state, mode: action.mode }
		case 'SET_MERIDIEM':
			return { ...state, meridiem: action.meridiem }
	}
	return state
}

export function StateProvider({
	onChange,
	time: parentTime,
	children,
	disabledTimeRange,
}: Props) {
	const config = useConfig()
	const [state, dispatch] = useReducer(reducer, null, () => {
		return {
			time: parseTime(parentTime),
			mode: config.hour24Mode ? MODE.HOURS_24 : MODE.HOURS_12,
			// need meridiem for context when 12h mode, so can tell
			// if user is changing hours before or after 12pm
			meridiem: parseMeridiem(parentTime),
		} as GlobalState
	})
	const { mode, time, meridiem } = state
	const refTime = useRef(time)

	// store onChange as ref to memoize update fn
	const onChangeFn = useRef(onChange)
	const onDoneClickFn = useRef(config.onDoneClick)

	useEffect(() => {
		onChangeFn.current = onChange
	}, [onChange])

	useEffect(() => {
		onDoneClickFn.current = config.onDoneClick
	}, [config.onDoneClick])

	const disabledTimeRangeValidator = useMemo(() => {
		const from = disabledTimeRange?.from
		const to = disabledTimeRange?.to
		if (!from || !to) {
			return null
		}
		return new DisabledTimeRange(from, to)
	}, [disabledTimeRange?.from, disabledTimeRange?.to])

	// handle time update if parent changes
	useEffect(() => {
		if (parentTime == null) {
			return
		}
		const newTime = parseTime(parentTime)
		if (isSameTime(newTime, refTime.current)) {
			return
		}
		const action: any = { type: 'SET_TIME', time: parseTime(parentTime) }
		if (!config.hour24Mode) {
			action.meridiem = parseMeridiem(parentTime)
		}
		dispatch(action)
	}, [config.hour24Mode, parentTime])

	const getComposedTime = useCallback(() => {
		const time = refTime.current
		return composeTime(time.hour, time.minute, disabledTimeRangeValidator)
	}, [disabledTimeRangeValidator])

	// debounced onChange function from parent
	const debounceUpdateParent = useMemo(() => {
		return debounce(() => {
			typeof onChangeFn.current === 'function' &&
				onChangeFn.current(getComposedTime())
		}, 80)
	}, [getComposedTime])

	// update time on component and then on parent
	const updateTime = useCallback(
		(newTime: Time, meridiem?: MERIDIEM) => {
			// update component global state
			dispatch({ type: 'SET_TIME', time: newTime, meridiem })
			refTime.current = newTime

			// update time on parent
			debounceUpdateParent()
		},
		[debounceUpdateParent],
	)

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
		updateTime(newTime, newMeridiem)
	}

	const setMode = useCallback(
		(mode: MODE) => {
			let m = mode
			if (isHourMode(mode)) {
				m = config.hour24Mode ? MODE.HOURS_24 : MODE.HOURS_12
			}
			dispatch({ type: 'SET_MODE', mode: m })
		},
		[config.hour24Mode],
	)

	// handle any side effects from changing the time (ie: change mode, trigger done clicks)
	const handleUpdateTimeSideEffects = useCallback(
		(source: UpdateTimeValueSource) => {
			if (source.type === 'clock' && source.canAutoChangeMode) {
				if (config.switchToMinuteOnHourSelect && isHourMode(mode)) {
					setMode(MODE.MINUTES)
				} else if (
					config.closeOnMinuteSelect &&
					isMinuteMode(mode) &&
					onDoneClickFn.current
				) {
					onDoneClickFn.current(getComposedTime())
				}
			} else if (source.type === 'dropdown') {
				if (config.switchToMinuteOnHourDropdownSelect && isHourMode(mode)) {
					setMode(MODE.MINUTES)
				}
			}
		},
		[
			config.switchToMinuteOnHourSelect,
			config.closeOnMinuteSelect,
			config.switchToMinuteOnHourDropdownSelect,
			getComposedTime,
			mode,
			setMode,
		],
	)

	// this method is called only due to changes in clock actions
	const updateTimeValue = useCallback(
		(val: number, source: UpdateTimeValueSource) => {
			// account if minutes is 60 (eg: 59 rounded to 60)
			val = val % 60

			// account for max number being 12 during 12h mode
			if (mode === MODE.HOURS_12 && meridiem === 'pm') {
				val += 12
			}

			const unit = isHourMode(mode) ? 'hour' : 'minute'
			const time = refTime.current

			// perf to avoid unecessary updates when dragging on clock
			if (
				time[unit] === val &&
				source.type === 'clock' &&
				!source.canAutoChangeMode
			) {
				return
			}

			// if time is blocked off, dont update
			if (disabledTimeRangeValidator) {
				if (
					(isHourMode(mode) && !disabledTimeRangeValidator.validateHour(val)) ||
					(isMinuteMode(mode) &&
						!disabledTimeRangeValidator.validateMinute(time.hour, val))
				) {
					return
				}
			}

			handleUpdateTimeSideEffects(source)

			// generate new time and update timekeeper state
			const newTime: Time = { ...time, [unit]: val }
			updateTime(newTime)
		},
		[
			mode,
			meridiem,
			handleUpdateTimeSideEffects,
			disabledTimeRangeValidator,
			updateTime,
		],
	)

	const value = {
		time,
		mode,
		updateTimeValue,
		updateMeridiem,
		setMode,
		getComposedTime,
		disabledTimeRangeValidator,
		meridiem,
	}
	return <stateContext.Provider value={value}>{children}</stateContext.Provider>
}

export default function useTimekeeperState(): StateContext {
	return useContext(stateContext)
}
