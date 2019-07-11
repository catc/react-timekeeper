import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'

import { Time } from '../helpers/types'
import {
	CLOCK_SIZE,
	CLOCK_RADIUS,
	CLOCK_HAND_LENGTH,
	NUMBER_SIZE,
	NUMBER_INNER_POSITION,
	MODE,
	CLOCK_VALUES,
	getTimeValue,
} from '../helpers/constants'

export const CLOCK_BACKGROUND = 'white'
export const CLOCK_NUMBER_COLOR = '#999999'
export const CLOCK_HAND_ARM = '#bceaff'
export const CLOCK_HAND_CIRCLE_BACKGROUND = '#e6f7ff'
export const CLOCK_HAND_INTERMEDIATE_CIRCLE_BACKGROUND = '#ade2fb'

interface Props {
	mode: MODE
	time: Time
}

function rotate(r) {
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
				cy={NUMBER_INNER_POSITION}
				r={4}
				fill={CLOCK_HAND_INTERMEDIATE_CIRCLE_BACKGROUND}
			/>
		)
	}

	return (
		<svg
			width={CLOCK_SIZE}
			height={CLOCK_SIZE}
			viewBox={`0 0 ${CLOCK_SIZE} ${CLOCK_SIZE}`}
			xmlns="http://www.w3.org/2000/svg"
			style={{ overflow: 'visible' }}
			// className="clock-hand"
			// style={{
			// 	...styles.clockHand,
			// 	opacity: anim.style.handOpacity,
			// }}
			className="clock-hand react-timekeeper__clock-svgs"
		>
			<g transform={rotate(t)}>
				<line
					x1={CLOCK_RADIUS}
					y1={CLOCK_RADIUS}
					x2={CLOCK_RADIUS}
					y2={CLOCK_RADIUS - CLOCK_HAND_LENGTH}
					strokeWidth="1"
					// stroke={config.CLOCK_HAND_ARM}
					stroke={CLOCK_HAND_ARM} // TODO
				/>
				<circle cx={CLOCK_RADIUS} cy={CLOCK_RADIUS} r={1.5} fill={CLOCK_HAND_ARM} />
				<circle
					cx={CLOCK_RADIUS}
					cy={NUMBER_INNER_POSITION}
					r={NUMBER_SIZE / 2}
					// fill={config.CLOCK_HAND_CIRCLE_BACKGROUND}
					fill={CLOCK_HAND_CIRCLE_BACKGROUND} // TODO
				/>
				{showIntermediateValueDisplay}
			</g>
		</svg>
	)
}
