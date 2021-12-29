import { useCallback, useRef } from 'react'

import useConfig from '../hooks/useConfigContext'
import Clock from './Clock'
import Meridiems from './Meridiems'
import style from './styles/clock-wrapper'
import useClockEvents from '../hooks/useClockEvents'
import { MODE, CLOCK_VALUES } from '../helpers/constants'
import { isHourMode, isMinuteMode } from '../helpers/utils'
import useTimekeeperState from '../hooks/useStateContext'

export default function ClockWrapper() {
	const config = useConfig()

	// clock events
	const clock = useRef<HTMLDivElement | null>(null)

	const { mode, updateTimeValue } = useTimekeeperState()

	/*
		LOGIC AROUND COARSE
		- on drag, if count < 2, do not force coarse
		- on mouseup, if count < 2 do not force coarse
		- handlepoint
			- if `wasTapped` OR `forceCoarse` config, then coarse it
		- coarse is just rounding number to an increment before setting unit

		LOGIC AROUND CAN CHANGE UNIT
		- on drag, CAN NOT change unit
		- on mouseup, can change unit
		- AFTER time has been set, then determine if need to change unit
			- based on this and user input
	*/

	/*
		converts angle into time, also factors in any rounding to the closest increment
	*/
	const calculateTimeValue = useCallback(
		(
			angle: number,
			{ canAutoChangeMode = false, wasTapped = false, isInnerClick = false },
		) => {
			// total number of allowable increments, 12/24 for hours, 60 for min
			const totalIncrements = CLOCK_VALUES[mode].increments
			// minimum increment used for rounding
			let minIncrement = 1

			// coarse minutes
			if (isMinuteMode(mode) && (wasTapped || config.forceCoarseMinutes)) {
				minIncrement = config.coarseMinutes
			}

			const val = (angle / 360) * totalIncrements
			let selected = Math.round(val / minIncrement) * minIncrement

			/*
				normalize value, acounts for angle that 12 is selected at, eg:
				- if 12 clicked between 12 and 1, results in 0
				- if 12 clicked between 11 and 12, results in 12
			*/
			if (isHourMode(mode)) {
				selected = selected % 12
			}
			if (mode === MODE.HOURS_24 && config.hour24Mode) {
				if (!isInnerClick) {
					selected += 12
				}
				// fixes 12pm and midnight, both angle -> selected return 0
				// for midnight need a final selected of 0, and for noon need 12
				if (selected === 12) selected = 0
				else if (selected === 0) selected = 12
			}

			// update time officially on timekeeper
			updateTimeValue(selected, { type: 'clock', canAutoChangeMode })
		},
		[
			config.forceCoarseMinutes,
			config.coarseMinutes,
			config.hour24Mode,
			mode,
			updateTimeValue,
		],
	)

	const { bind } = useClockEvents(clock, calculateTimeValue)

	return (
		<div
			{...bind}
			className="react-timekeeper__clock-wrapper"
			css={style}
			data-testid="clock-wrapper"
		>
			<Clock clockEl={clock} />

			{!config.hour24Mode && <Meridiems />}
		</div>
	)
}
