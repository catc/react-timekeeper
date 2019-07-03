import React, { useState, useEffect, useRef } from 'react'
import { useTransition, useSpring, animated, useSprings, config } from 'react-spring'

interface Props {
	mode: string
}

// const HOURS_12 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((v) => ({ val: v, id: 'h_' + v }))
// const MINUTES = ['05', 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, '00'].map((v) => ({
// 	val: v.toString(),
// 	id: 'h_' + v,
// }))
const HOURS_12 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
const MINUTES = ['05', 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, '00'].map((a) => a.toString())

// radius of clock, in px
const CLOCK_RADIUS = 110
const CLOCK_SIZE = CLOCK_RADIUS * 2

// clock hand length, in px
const CLOCK_HAND_LENGTH = 90

// number of actual numbers to display
const NUMBER_INCREMENTS = 12
const NUMBER_INCREMENTS_VALUE = 360 / NUMBER_INCREMENTS

// size of circle surrounding number
const NUMBER_SIZE = 34

// positioning of numbers within circle
const NUMBER_INNER_POSITION = 22
function animationPosition(unit) {
	return unit === 'hour' ? NUMBER_INNER_POSITION - 30 : NUMBER_INNER_POSITION + 26
}

const { cos, sin, atan2 } = Math
const pi = Math.PI

function rad(deg) {
	return deg / (180 / pi)
}
function deg(rad) {
	return rad * (180 / pi)
}

const DATA = {}

function translateX(i, t) {
	return (
		sin(rad(i * -NUMBER_INCREMENTS_VALUE - 180)) * (CLOCK_RADIUS - t) +
		CLOCK_RADIUS -
		NUMBER_SIZE / 2
	)
}

function translateY(i, t) {
	return (
		cos(rad(i * -NUMBER_INCREMENTS_VALUE - 180)) * (CLOCK_RADIUS - t) +
		CLOCK_RADIUS -
		NUMBER_SIZE / 2
	)
}

function transform(i, t) {
	const x = translateX(i, t)
	const y = translateY(i, t)
	// console.log('1111111', t)
	return `translate(${x}px, ${y}px)`
}

function foo() {
	const [toggle, set] = useState(false)
	const transitions = useTransition(toggle, null, {
		from: { position: 'absolute', opacity: 0 },
		enter: { opacity: 1 },
		leave: { opacity: 0 },
	})

	return transitions.map(({ item, key, props }) =>
		item ? (
			<animated.div style={props}>😄</animated.div>
		) : (
			<animated.div style={props}>🤪</animated.div>
		),
	)
}

function exitPosition(unit) {
	return unit === 'hour' ? NUMBER_INNER_POSITION - 30 : NUMBER_INNER_POSITION + 26
}

function exitPosition2(unit) {
	return unit === 'minute' ? NUMBER_INNER_POSITION - 30 : NUMBER_INNER_POSITION + 26
}

export default function ClockWrapper5({ mode }: Props) {
	const firstTime = useRef(true)
	const transitions = useTransition(mode, null, {
		unique: true,
		from: firstTime.current ? {} : { opacity: 0, translate: exitPosition2(mode) },
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
		<div className="clock-wrapper">
			{transitions.map(({ item, key, props }) => {
				return item === 'hour' ? (
					<animated.div key={key} style={{ opacity: props.opacity }}>
						{HOURS_12.map((val, i) => {
							// const num = i + 1
							return (
								<animated.span
									className="number-positioning"
									key={val}
									style={{
										// opacity: props.opacity,
										transform: props.translate.interpolate((v) =>
											transform(i + 1, v),
										),
									}}
								>
									{val}
								</animated.span>
							)
						})}
					</animated.div>
				) : (
					<animated.div key={key} style={{ opacity: props.opacity }}>
						{MINUTES.map((val, i) => {
							return (
								<animated.span
									className="number-positioning"
									key={val}
									style={{
										// opacity: props.opacity,
										transform: props.translate.interpolate((v) =>
											transform(i + 1, v),
										),
									}}
								>
									{val}
								</animated.span>
							)
						})}
					</animated.div>
				)
			})}
		</div>
	)
}
