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

	- use emotion + figure out styles
	- add clock hand
*/
export default function ClockWrapper({ mode, handleChange }: Props) {
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
			<Clock mode={mode} clockEl={clock} />
		</div>
	)
}
