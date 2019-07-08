import React, { useState, useRef, useCallback } from 'react'

import Clock from './Clock'
import useClockEvents from '../hooks/handle-clock-events'

interface Props {
	mode: string
}

/*
	TODO
	- handle events and pass up
*/
export default function ClockWrapper({ mode }: Props) {
	const wrapper = useRef<HTMLDivElement | null>(null)
	const clock = useRef<HTMLDivElement | null>(null)

	const { mousedown, touchstart } = useClockEvents(wrapper, clock)

	return (
		<div
			ref={wrapper}
			onMouseDown={mousedown}
			onTouchStart={touchstart}
			// TODO - replace styles with emotion
			className="react-timekeeper__clock clock"
		>
			<Clock mode={mode} clockEl={clock} />

			<button
				onClick={() => {
					console.log('checking...', clock)
				}}
			>
				Check
			</button>
		</div>
	)
}
