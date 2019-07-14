import React, { useState, useRef, useCallback } from 'react'
import { css, jsx } from '@emotion/core'

import Clock from './Clock'
import Meridiems from './Meridiems'
import useClockEvents from '../hooks/handle-clock-events'
import { MODE } from '../helpers/constants'
import { CLOCK_WRAPPER_BACKGROUND } from './styles/constants'

interface Props {
	mode: MODE
	calculateTimeValue: () => void
}

/*
	TODO
	- handle events and pass up

	LEFT OFF AT
	- incorporate `handlePoint`
	- incorporate `calculateTimeValue` in `TimePicker` component that calls parent
		- add time helper functions
*/

const style = css`
	text-align: center;
	padding: 18px 0 14px;
	background: ${CLOCK_WRAPPER_BACKGROUND};
`

export default function ClockWrapper({ mode, calculateTimeValue, time }: Props) {
	const wrapper = useRef<HTMLDivElement | null>(null)
	const clock = useRef<HTMLDivElement | null>(null)

	const { mousedown, touchstart } = useClockEvents(wrapper, clock, calculateTimeValue)

	return (
		<div
			ref={wrapper}
			onMouseDown={mousedown}
			onTouchStart={touchstart}
			className="react-timekeeper__clock-wrapper"
			css={style}
		>
			<Clock time={time} mode={mode} clockEl={clock} />

			<Meridiems time={time} />
		</div>
	)
}
