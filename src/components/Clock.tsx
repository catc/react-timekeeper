import React, { useState, useEffect, useRef } from 'react'
import { useTransition } from 'react-spring'

import { HourNumbers, MinuteNumbers } from './Numbers'
import {
	NUMBER_INNER_POSITION,
	INITIAL_HOUR_TRANSFORM,
	INITIAL_MINUTE_TRANSFORM,
} from '../helpers/constants'
import { ElementRef } from '../helpers/types'

// TODO - move in separate functions?
function exitPosition(unit: string): number {
	return unit === 'hour' ? INITIAL_HOUR_TRANSFORM : INITIAL_MINUTE_TRANSFORM
}

function initialPosition(unit: string): number {
	return unit === 'minute' ? INITIAL_HOUR_TRANSFORM : INITIAL_MINUTE_TRANSFORM
}

interface Props {
	mode: string
	clockEl: ElementRef
}

export default function ClockWrapper5({ mode, clockEl }: Props) {
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
				return item === 'hour' ? (
					<HourNumbers anim={props} key={key} />
				) : (
					<MinuteNumbers anim={props} key={key} />
				)
			})}

			{/* TODO - add clock hand */}
		</div>
	)
}
