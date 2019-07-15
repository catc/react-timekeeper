import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'

import { Time } from '../helpers/types'
import { getTimeValue } from '../helpers/utils'
import {
	CLOCK_SIZE,
	CLOCK_RADIUS,
	CLOCK_HAND_LENGTH,
	NUMBER_SIZE,
	NUMBER_OUTER_POSITION,
	INNER_NUMBER_CLOCK_HAND_LENGTH,
	MODE,
	CLOCK_VALUES,
} from '../helpers/constants'
import {
	CLOCK_HAND_ARM as CLOCK_HAND_ARM_FILL,
	CLOCK_HAND_CIRCLE_BACKGROUND,
	CLOCK_HAND_INTERMEDIATE_CIRCLE_BACKGROUND,
} from './styles/constants'

interface Props {
	mode: MODE
	time: Time
}

function rotate(r: number) {
	return `rotate(${r} ${CLOCK_RADIUS} ${CLOCK_RADIUS})`
}

export default function ClockHand({ mode, time }: Props) {
	const increments = CLOCK_VALUES[mode].increments
	const value = getTimeValue(mode, time)
	const t = value * (360 / increments)

	// mini circle on clockhand between increments on minutes
	let showIntermediateValueDisplay
	if (mode === MODE.MINUTES && value % 5) {
		showIntermediateValueDisplay = (
			<circle
				cx={CLOCK_RADIUS}
				cy={NUMBER_OUTER_POSITION}
				r={4}
				fill={CLOCK_HAND_INTERMEDIATE_CIRCLE_BACKGROUND}
			/>
		)
	}

	// positioning of line and circle under number
	let positioning = {
		handLength: CLOCK_RADIUS - CLOCK_HAND_LENGTH,
		circlePosition: NUMBER_OUTER_POSITION,
		circleRadius: NUMBER_SIZE / 2,
	}
	// support inner numbers on 24 hour mode
	if (mode === MODE.HOURS_24) {
		const h = time.hour
		positioning.handLength = isOuter(h)
			? positioning.handLength
			: CLOCK_RADIUS - INNER_NUMBER_CLOCK_HAND_LENGTH
		positioning.circlePosition = isOuter(h)
			? positioning.circlePosition
			: INNER_NUMBER_CLOCK_HAND_LENGTH
		// TODO
		positioning.circleRadius = NUMBER_SIZE / 2
	}

	function isOuter(h: number): boolean {
		if (h === 0 || h > 12) {
			return true
		}
		return false
	}

	// TODO - experiment with animated clockhand between modes
	return (
		<svg
			width={CLOCK_SIZE}
			height={CLOCK_SIZE}
			viewBox={`0 0 ${CLOCK_SIZE} ${CLOCK_SIZE}`}
			xmlns="http://www.w3.org/2000/svg"
			className="react-timekeeper__clock-hand"
			// style={{ overflow: 'visible' }}
			// style={{
			// 	...styles.clockHand,
			// 	opacity: anim.style.handOpacity,
			// }}
		>
			<g transform={rotate(t)}>
				<line
					stroke={CLOCK_HAND_ARM_FILL}
					x1={CLOCK_RADIUS}
					y1={CLOCK_RADIUS}
					x2={CLOCK_RADIUS}
					y2={positioning.handLength}
					strokeWidth="1"
				/>
				<circle cx={CLOCK_RADIUS} cy={CLOCK_RADIUS} r={1.5} fill={CLOCK_HAND_ARM_FILL} />
				<circle
					fill={CLOCK_HAND_CIRCLE_BACKGROUND}
					cx={CLOCK_RADIUS}
					cy={positioning.circlePosition}
					r={positioning.circleRadius}
					opacity="0.7"
				/>
				{showIntermediateValueDisplay}
			</g>
		</svg>
	)
}
