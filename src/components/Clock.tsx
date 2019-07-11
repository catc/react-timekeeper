import React, { useState, useEffect, useRef } from 'react'
import { useTransition } from 'react-spring'

import ClockHand from './ClockHand'
import { HourNumbers, MinuteNumbers } from './Numbers'
import {
	NUMBER_INNER_POSITION,
	INITIAL_HOUR_TRANSFORM,
	INITIAL_MINUTE_TRANSFORM,
	MODE,
} from '../helpers/constants'
import { ElementRef } from '../helpers/types'

// TODO - move in separate functions?
function exitPosition(unit: MODE): number {
	return unit === MODE.HOURS_12 ? INITIAL_HOUR_TRANSFORM : INITIAL_MINUTE_TRANSFORM
}

function initialPosition(unit: MODE): number {
	return unit === MODE.MINUTES ? INITIAL_HOUR_TRANSFORM : INITIAL_MINUTE_TRANSFORM
}

interface Props {
	mode: MODE
	clockEl: ElementRef
}

export default function ClockWrapper5({ mode, clockEl, time }: Props) {
	const firstTime = useRef(true)
	const transitions = useTransition(mode, null, {
		unique: true,
		from: firstTime.current ? {} : { opacity: 0, translate: initialPosition(mode) },
		enter: {
			opacity: 1,
			translate: NUMBER_INNER_POSITION,
		},
		leave: {
			opacity: 0,
			translate: exitPosition(mode),
		},
	})

	useEffect(() => {
		// don't show intial animation on first render - ie: {from : ...}
		firstTime.current = false
	}, [])

	return (
		<div className="clock-wrapper" ref={clockEl}>
			{transitions.map(({ item, key, props }) => {
				return item === MODE.HOURS_12 ? (
					<HourNumbers anim={props} key={key} />
				) : (
					<MinuteNumbers anim={props} key={key} />
				)
			})}

			{/* place svg over and set z-index on numbers to prevent highlighting numbers on drag */}
			<ClockHand time={time} mode={mode} />
		</div>
	)
}
