import React, { useRef } from 'react'
import { jsx } from '@emotion/core'

import useConfig from '../hooks/config'
import Clock from './Clock'
import Meridiems from './Meridiems'
import useClockEvents from '../hooks/handle-clock-events'
import style from './styles/clock-wrapper'
import { MODE, CLOCK_VALUES } from '../helpers/constants'
import { isHourMode, isMinuteMode } from '../helpers/utils'
import useTimekeeperState from '../hooks/state-context'

export default function ClockWrapper() {
	const config = useConfig()

	// clock events
	const wrapper = useRef<HTMLDivElement | null>(null)
	const clock = useRef<HTMLDivElement | null>(null)
	const { mousedown, touchstart } = useClockEvents(wrapper, clock, calculateTimeValue)

	const { mode, updateTime, setMode, getComposedTime } = useTimekeeperState()

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
	function calculateTimeValue(
		angle: number,
		{ canAutoChangeUnit = false, wasTapped = false, isInnerClick = false },
	) {
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

		if (mode === MODE.HOURS_24 && config.hour24Mode) {
			// fixes 12pm and midnight, both angle -> selected return 0
			// for midnight need a final selected of 0, and for noon need 12
			if (!isInnerClick && selected !== 0) {
				selected += 12
			} else if (isInnerClick && selected === 0) {
				selected += 12
			}
		}

		// update time officially on timekeeper
		updateTime(selected)

		// handle any unit autochanges or done click
		if (canAutoChangeUnit) {
			if (config.switchToMinuteOnHourSelect && isHourMode(mode)) {
				setMode(MODE.MINUTES)
			} else if (config.closeOnMinuteSelect && isMinuteMode(mode)) {
				config.onDoneClick && config.onDoneClick(getComposedTime())
			}
		}
	}

	return (
		<div
			ref={wrapper}
			onMouseDown={mousedown}
			onTouchStart={touchstart}
			className="react-timekeeper__clock-wrapper"
			css={style}
		>
			<Clock clockEl={clock} />

			{!config.hour24Mode && <Meridiems />}
		</div>
	)
}
