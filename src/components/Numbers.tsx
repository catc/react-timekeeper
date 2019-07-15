import React, { useRef, useEffect } from 'react'
import { animated, AnimatedValue, ForwardedProps, useTransition } from 'react-spring'

import { HOURS_12, MINUTES, CLOCK_VALUES, MODE } from '../helpers/constants'
import { transform } from '../helpers/math'
import { numbersStyle, numbersWrapperStyle } from './styles/numbers'

// TODO - fix types... typescript is hard
interface NumberProps {
	anim: {
		opacity: AnimatedValue<ForwardedProps<{ opacity: number }>>
		translate: AnimatedValue<ForwardedProps<{ translate: number }>>
		translateInner: AnimatedValue<ForwardedProps<{ translate: number }>>
	}
	mode?: MODE
	hour24Mode?: boolean
}

// TODO - split up functions into separate files
// TODO - better yet, have 1 function that does both?
export function HourNumbers({ anim, mode, hour24Mode }: NumberProps) {
	const { opacity, translate, translateInner } = anim
	const { numbers: numbersOuter, numbersInner } = CLOCK_VALUES[mode]

	return (
		<animated.div style={{ opacity: opacity }} css={numbersWrapperStyle}>
			{numbersOuter.map((val, i) => {
				return (
					<animated.span
						css={numbersStyle({ hour24Mode })}
						key={val}
						style={{
							transform: translate.interpolate((v) => transform(i + 1, v)),
						}}
					>
						{val}
					</animated.span>
				)
			})}

			{hour24Mode &&
				numbersInner.map((val, i) => {
					return (
						<animated.span
							css={numbersStyle({ hour24Mode, inner: true })}
							key={val}
							style={{
								transform: translateInner.interpolate((v) => transform(i + 1, v)),
							}}
						>
							{val}
						</animated.span>
					)
				})}
		</animated.div>
	)
}

export function MinuteNumbers({ anim }: NumberProps) {
	const { opacity, translate } = anim
	return (
		<animated.div style={{ opacity: opacity }} css={numbersWrapperStyle}>
			{MINUTES.map((val, i) => {
				return (
					<animated.span
						css={numbersStyle}
						key={val}
						style={{
							transform: translate.interpolate((v) => transform(i + 1, v)),
						}}
					>
						{val}
					</animated.span>
				)
			})}
		</animated.div>
	)
}
