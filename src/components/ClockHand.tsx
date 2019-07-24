import React, { memo, useEffect, useRef } from 'react'
import { animated, useSpring } from 'react-spring'

import { Time } from '../helpers/types'
import { getTimeValue, isHourMode } from '../helpers/utils'
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
import useConfig from '../hooks/config'
import { calcAnimationAngle } from '../helpers/math'

interface Props {
	mode: MODE
	time: Time
}

function rotate(r: number) {
	return `rotate(${r} ${CLOCK_RADIUS} ${CLOCK_RADIUS})`
}

function getAngle(mode: MODE, time: Time) {
	const increments = CLOCK_VALUES[mode].increments
	const value = getTimeValue(mode, time)
	return value * (360 / increments)
}

function timeIsDifferent(prev: Time, now: Time): boolean {
	return prev.hour !== now.hour || prev.minute !== now.minute
}

// TODO - move elsewhere?
// calculates the shortest angle between the prev and next angle
// to animate to
/* function calcAnimationAngle(prev: number, next: number): number {
	if (Math.abs(next - prev) > 180) {
		let diff = 0
		if (prev > next) {
			// TODO - need % here too
			diff = next + 360 - prev
		} else {
			diff = ((next - prev + 180) % 360) - 180
		}

		// return (prev + diff) % 360
		return prev + diff
	}
	return next
} */

/*
	TODO
	- DONE apply memo
		- reinvestigate if even necessary
	- suppport 24h mode weirdness
	- support arm length/number radius?
	- split up components into multiple parts
	- explore disabling animation during `switchToMinuteOnHourSelect`
		- or better yet, on hour select - go straight from old value to minute value
			- need to re-write handle-time hook and timekeeper
				- have to convert to reducer to be able to set new time AND mode at the same time
			- if `switchToMinuteOnHourSelect` AND previous mode was hours, then rotate
			the clockhand from the OLD hour (not newly selected hour)
				- would execute when timeIsDifferent AND modeIsDifferent only
	- fix tests
	- clean up overall
*/

function ClockHand({ mode, time }: Props) {
	const config = useConfig()

	// const hand = useRef(null)
	const prevState = useRef({ time, mode })
	const dragCount = useRef(0)

	// const prevTime = useRef(time)
	// const prevMode = useRef(mode)
	// const prevAngle = useRef(getAngle(mode, time))

	// const usePrevAngle = useRef(false)
	// const prevAngle = useRef([getAngle(mode, time), getAngle(mode, time)])
	// function updatePrevAngle(angle) {
	// 	prevAngle.current[1] = prevAngle.current[0]
	// 	prevAngle.current[0] = angle
	// }

	/* useEffect(() => {
		setTimeout(() => {
			window.go = () => {
				console.log(hand.current.transform.animVal[0])
			}
		}, 300)
	}, []) */

	const [anim, set] = useSpring(() => {
		return {
			immediate: true,
			rotation: getAngle(mode, time),
		}
	})
	const { rotation } = anim

	useEffect(() => {
		// const prev = prevAngle.current
		// const angle = getAngle(mode, time)

		// if (prev === angle) {
		// 	console.log('same angle')
		// 	return
		// }

		const current = rotation.value
		const next = getAngle(mode, time)

		if (current === next) {
			// TODO - see if this affects anything, i think it does
			return
		}

		if (prevState.current.mode !== mode) {
			dragCount.current = 0
			prevState.current.mode = mode
			// prevTime.current = time

			// const prev = prevAngle.current
			// // const next = getAngle(mode, time)
			// const next = angle
			const finalAngle = calcAnimationAngle(current, next)
			console.log('MODE CHANGED, from', current, finalAngle)

			set({
				immediate: false,
				rotation: finalAngle,
			})
			// prevAngle.current = next

			// TODO - check if need to set prevTime as well
		} else if (timeIsDifferent(prevState.current.time, time)) {
			// console.log('TIME CHANGED', prevTime.current, time)
			prevState.current.time = time
			dragCount.current++

			// console.log('time was', prevTime.current, 'and is now', time, 'with mode', mode)
			if (isHourMode(mode) && config.switchToMinuteOnHourSelect && dragCount.current < 2) {
				console.log('JUST WAIT')
				return
			}
			// if (isHourMode(mode) && config.switchToMinuteOnHourSelect && dragCount.current < 2) {
			// 	// usePrevAngle.current = true
			// } else {
			// }
			// console.log('TIME CHANGED - NOT HOUR MODE')
			// prevAngle.current = angle
			set({
				immediate: true,
				rotation: next,
			})
		}
	}, [config.switchToMinuteOnHourSelect, mode, rotation, set, time])

	// mini circle on clockhand between increments on minutes
	const value = getTimeValue(mode, time)
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

	return (
		<svg
			width={CLOCK_SIZE}
			height={CLOCK_SIZE}
			viewBox={`0 0 ${CLOCK_SIZE} ${CLOCK_SIZE}`}
			xmlns="http://www.w3.org/2000/svg"
			className="react-timekeeper__clock-hand"
			// style={{ overflow: 'visible' }}
		>
			<animated.g transform={rotation.interpolate((a) => rotate(a))}>
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
			</animated.g>
		</svg>
	)
}

function isSameProps(prevProps: Props, nextProps: Props) {
	return prevProps.mode === nextProps.mode && !timeIsDifferent(prevProps.time, nextProps.time)
}
export default memo(ClockHand, isSameProps)
