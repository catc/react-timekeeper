import React from 'react'
import { animated, AnimatedValue, ForwardedProps } from 'react-spring'

import { HOURS_12, MINUTES } from '../helpers/constants'
import { transform } from '../helpers/math'

// TODO - fix types... typescript is hard
interface NumberProps {
	anim: {
		opacity: AnimatedValue<ForwardedProps<{ opacity: number }>>
		translate: AnimatedValue<ForwardedProps<{ translate: number }>>
	}
}

// TODO - move this to styles

// zIndex required to be on top of clockhand
const s = { position: 'absolute', left: 0, top: 0, zIndex: 5 }

// TODO - split up functions into separate files
// TODO - better yet, have 1 function that does both?
export function HourNumbers({ anim }: NumberProps) {
	const { opacity, translate } = anim
	return (
		<animated.div style={{ opacity: opacity, ...s }}>
			{HOURS_12.map((val, i) => {
				return (
					<animated.span
						className="number-positioning"
						key={val}
						style={{
							transform: translate.interpolate((v) => transform(i + 1, v)),
						}}
					>
						{val}
					</animated.span>
				)
			})}

			{/* TODO - add support for 24 hour mode */}
		</animated.div>
	)
}

export function MinuteNumbers({ anim }: NumberProps) {
	const { opacity, translate } = anim
	return (
		<animated.div style={{ opacity: opacity, ...s }}>
			{MINUTES.map((val, i) => {
				return (
					<animated.span
						className="number-positioning"
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
