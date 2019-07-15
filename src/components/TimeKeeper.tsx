import React, { useState, useCallback } from 'react'
import { Global, css, jsx } from '@emotion/core'

import globalStyle from './styles/global'
import style from './styles/main'
import useConfig from '../hooks/config'
import ClockWrapper from './ClockWrapper'
import { TimeInput, ChangeTimeFn } from '../helpers/types'
import { MODE, CLOCK_VALUES } from '../helpers/constants'
import useHandleTime from '../hooks/handle-time'
import { isHourMode, isMinuteMode } from '../helpers/utils'

export interface Props {
	time: TimeInput
	onChange: ChangeTimeFn
}

export default function TimeKeeper({ onChange, time: parentTime }: Props) {
	const config = useConfig()
	const [mode, setMode] = useState(config.hour24Mode ? MODE.HOURS_24 : MODE.HOURS_12)
	const { time, updateTime, updateMeridiem } = useHandleTime(
		parentTime,
		onChange,
		mode,
		config.hour24Mode,
	)

	// handle any unit autochanges or closeos
	const handleTimeUpdateSideEffects = useCallback(() => {
		if (config.switchToMinuteOnHourSelect && isHourMode(mode)) {
			setMode(MODE.MINUTES)
		} else if (config.closeOnMinuteSelect && isMinuteMode(mode)) {
			config.onDoneClick && config.onDoneClick()
		}
	}, [config, mode, setMode])

	// actually do the updates
	const handleUpdates = useCallback(
		(val: number, canAutoChangeUnit: boolean) => {
			updateTime(val)

			if (canAutoChangeUnit) {
				handleTimeUpdateSideEffects()
			}
		},
		[handleTimeUpdateSideEffects, updateTime],
	)

	/*
		LOGIC AROUND COARSE
		- on drag, if count < 2, do not force coarse
		- on mouseup, if count < 2 do not force coarse
		- handlepoint
			- if config OR forceCoarse arg, then coarse it
			- since now providing option for coarse... need a more sophisticated method?
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
		(angle, { canAutoChangeUnit = false, wasTapped = false, isInnerClick = false }) => {
			/*
				TODO
				- if coarse, avoid the double calculation
				- first check if coarse, and then do one or either
			*/

			const increments = CLOCK_VALUES[mode].increments
			/*
				calculate time value based on current clock increments
				- % is to normalize angle - otherwise left side of 0 gives 12, right side of 0 gives 0
			*/
			let selected = Math.round((angle / 360) * increments) % increments
			if (mode === MODE.HOURS_24 && config.hour24Mode) {
				// fixes 12pm and midnight, both angle -> selected return 0
				// for midnight need a final selected of 0, and for noon need 12
				if (!isInnerClick && selected !== 0) {
					selected += 12
				} else if (isInnerClick && selected === 0) {
					selected += 12
				}
			}

			/*
				TODO
				- clean up this logic, make it reusable for hours as well
				- add hours coarse as well
					- add a coarse object to config?
					- but pass in to component as separate?
				- fade out numbers depending on whether is has coarse value
					- for this, should calculate all numbers and determine
					which ones are faded out and cache
			*/

			/* if (mode === MODE.MINUTES) {
				const coarseMinutes = config.coarseMinutes
				const roundValue = coarseMinutes > 1 || wasTapped
				if (roundValue) {
					// number was just tapped so account for fat finger
					// or coarse increments are enabled
					const multiplier = coarseMinutes > 1 ? coarseMinutes : 5
					// const multiplier = CLOCK_DATA[unit].coarseMultiplier;
					selected = Math.round(selected / multiplier) * multiplier
				}
			} */

			// update time officially on this component
			handleUpdates(selected, canAutoChangeUnit)
		},
		[config.hour24Mode, handleUpdates, mode],
	)

	return (
		<>
			<Global styles={css(globalStyle)} />

			<div className="react-timekeeper" css={[style, config.styles.main]}>
				{time.hour}:{time.minute}
				<button
					onClick={() => {
						let m
						if (mode === MODE.HOURS_24 || mode === MODE.HOURS_12) {
							m = MODE.MINUTES
						} else {
							m = config.hour24Mode ? MODE.HOURS_24 : MODE.HOURS_12
						}
						setMode(m)
					}}
				>
					change type - {mode}
				</button>
				<br />
				<br />
				<br />
				<br />
				{/* TODO - top bar */}
				<ClockWrapper
					time={time}
					mode={mode}
					calculateTimeValue={calculateTimeValue}
					updateMeridiem={updateMeridiem}
				/>
				{/* TODO - done button */}
			</div>
		</>
	)
}
