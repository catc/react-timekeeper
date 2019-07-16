import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'

import { Time } from '../helpers/types'
import { getTimeValue } from '../helpers/utils'
import {
	CLOCK_SIZE,
	CLOCK_RADIUS,
	NUMBER_OUTER_POSITION,
	MODE,
	CLOCK_VALUES,
	getClockHandCirclePosition,
	getClockHandCircleRadius,
	getClockHandLength,
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

	// clockhand positioning
	const h = time.hour
	const inner = h > 0 && h <= 12
	const handLength = getClockHandLength(mode, inner)
	const circlePosition = getClockHandCirclePosition(mode, inner)
	const circleRadius = getClockHandCircleRadius(mode, inner)

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
					y2={handLength}
					strokeWidth="1"
				/>
				<circle cx={CLOCK_RADIUS} cy={CLOCK_RADIUS} r={1.5} fill={CLOCK_HAND_ARM_FILL} />
				<circle
					fill={CLOCK_HAND_CIRCLE_BACKGROUND}
					cx={CLOCK_RADIUS}
					cy={circlePosition}
					r={circleRadius}
				/>
				{showIntermediateValueDisplay}
			</g>
		</svg>
	)
}
