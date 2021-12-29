import { useEffect, useRef } from 'react'
import { useTransition } from 'react-spring'

import ClockHand from './ClockHand'
import { HourNumbers, MinuteNumbers } from './Numbers'
import {
	INITIAL_HOUR_TRANSFORM,
	INITIAL_MINUTE_TRANSFORM,
	MODE,
	INNER_NUMBER_POSITIONING,
	getOuterNumberPosition,
} from '../helpers/constants'
import { isHourMode, isMinuteMode } from '../helpers/utils'
import { ElementRef } from '../helpers/types'
import style from './styles/clock'
import useConfig from '../hooks/useConfigContext'
import useTimekeeperState from '../hooks/useStateContext'

function exitPosition(mode: MODE): number {
	return isHourMode(mode) ? INITIAL_HOUR_TRANSFORM : INITIAL_MINUTE_TRANSFORM
}

function initialPosition(mode: MODE): number {
	return isMinuteMode(mode) ? INITIAL_HOUR_TRANSFORM : INITIAL_MINUTE_TRANSFORM
}

interface Props {
	clockEl: ElementRef
}

export default function ClockWrapper({ clockEl }: Props) {
	const firstRun = useRef(true)
	const { hour24Mode } = useConfig()
	const { mode, time, meridiem, disabledTimeRangeValidator } = useTimekeeperState()

	const transitions = useTransition(mode, {
		unique: true,
		from: !firstRun.current && {
			opacity: 0,
			translate: initialPosition(mode),
			translateInner: INNER_NUMBER_POSITIONING.exit,
		},
		enter: {
			opacity: 1,
			translate: getOuterNumberPosition(mode),
			translateInner: INNER_NUMBER_POSITIONING.enter,
		},
		leave: {
			opacity: 0,
			translate: exitPosition(mode),
			translateInner: INNER_NUMBER_POSITIONING.exit,
		},
	})

	useEffect(() => {
		// don't show intial animation on first render - ie: {from : ...}
		firstRun.current = false
	}, [])

	return (
		<div className="react-timekeeper__clock" css={style} ref={clockEl}>
			{transitions((anim, currentMode) =>
				isMinuteMode(currentMode) ? (
					<MinuteNumbers
						anim={anim}
						disabledTimeRangeValidator={disabledTimeRangeValidator}
						hour={time.hour}
					/>
				) : (
					<HourNumbers
						anim={anim}
						mode={currentMode as MODE.HOURS_12 | MODE.HOURS_24}
						hour24Mode={hour24Mode}
						disabledTimeRangeValidator={disabledTimeRangeValidator}
						meridiem={meridiem}
					/>
				),
			)}

			{/* place svg over and set z-index on numbers to prevent highlighting numbers on drag */}
			<ClockHand time={time} mode={mode} />
		</div>
	)
}
