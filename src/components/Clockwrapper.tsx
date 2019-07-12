import React, { useState, useRef, useCallback } from 'react'

import Clock from './Clock'
import useClockEvents from '../hooks/handle-clock-events'
import { MODE } from '../helpers/constants'

interface Props {
	mode: MODE
	handleChange: () => void
}

/*
	TODO
	- handle events and pass up

	LEFT OFF AT
	- incorporate `handlePoint`
	- incorporate `handleChange` in `TimePicker` component that calls parent
		- add time helper functions
*/

export default function ClockWrapper({ mode, handleChange, time }: Props) {
	const wrapper = useRef<HTMLDivElement | null>(null)
	const clock = useRef<HTMLDivElement | null>(null)

	const { mousedown, touchstart } = useClockEvents(wrapper, clock, handleChange)

	return (
		<div
			ref={wrapper}
			onMouseDown={mousedown}
			onTouchStart={touchstart}
			// TODO - replace styles with emotion
			className="react-timekeeper__clock clock"
		>
			<Clock time={time} mode={mode} clockEl={clock} />
		</div>
	)
}
