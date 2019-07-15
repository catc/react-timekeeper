import React, { useEffect, useRef } from 'react'
import { useTransition } from 'react-spring'
import { css, jsx } from '@emotion/core'

import ClockHand from './ClockHand'
import { HourNumbers, MinuteNumbers } from './Numbers'
import {
	NUMBER_OUTER_POSITION,
	INITIAL_HOUR_TRANSFORM,
	INITIAL_MINUTE_TRANSFORM,
	MODE,
	INNER_NUMBER_POSITIONING,
	INNER_NUMBER_RADIUS,
} from '../helpers/constants'
import { isHourMode, isMinuteMode } from '../helpers/utils'
import { ElementRef, Time } from '../helpers/types'
import style from './styles/clock'
import useConfig from '../hooks/config'

// TODO - move in separate functions?
function exitPosition(mode: MODE): number {
	return isHourMode(mode) ? INITIAL_HOUR_TRANSFORM : INITIAL_MINUTE_TRANSFORM
}

function initialPosition(mode: MODE): number {
	return !isHourMode(mode) ? INITIAL_HOUR_TRANSFORM : INITIAL_MINUTE_TRANSFORM
}

interface Props {
	mode: MODE
	clockEl: ElementRef
	time: Time
}

export default function ClockWrapper5({ mode, clockEl, time }: Props) {
	const firstTime = useRef(true)
	const { hour24Mode } = useConfig()

	// TODO - tweak transitions property styles based on mode (12hr vs 24hour)
	const transitions = useTransition(mode, null, {
		unique: true,
		from: !firstTime.current && {
			opacity: 0,
			translate: initialPosition(mode),
			translateInner: INNER_NUMBER_POSITIONING.initial,
		},
		enter: {
			opacity: 1,
			translate: NUMBER_OUTER_POSITION,
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
		firstTime.current = false
	}, [])

	return (
		<div className="react-timekeeper__clock" css={style} ref={clockEl}>
			{transitions.map(({ item: mode, key, props }) => {
				return isMinuteMode(mode) ? (
					<MinuteNumbers anim={props} key={key} />
				) : (
					<HourNumbers anim={props} key={key} mode={mode} hour24Mode={hour24Mode} />
				)
			})}

			{/* place svg over and set z-index on numbers to prevent highlighting numbers on drag */}
			<ClockHand time={time} mode={mode} />

			<span
				css={css`
					background: rgba(255, 2, 2, 0.2);
					width: ${INNER_NUMBER_RADIUS * 2}px;
					height: ${INNER_NUMBER_RADIUS * 2}px;
					display: inline-block;
					position: absolute;
					left: 50%;
					top: 50%;
					transform: translate(-50%, -50%);
					border-radius: 500px;
					pointer-events: none;
				`}
			>
				{' '}
			</span>
		</div>
	)
}
