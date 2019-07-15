import React, { useState, useRef, useCallback } from 'react'
import { css, jsx } from '@emotion/core'

import Clock from './Clock'
import Meridiems from './Meridiems'
import useClockEvents from '../hooks/handle-clock-events'
import { MODE } from '../helpers/constants'
import { CLOCK_WRAPPER_BACKGROUND } from './styles/constants'
import { CalcTimeFromAngle, Time } from 'src/helpers/types'

interface Props {
	mode: MODE
	time: Time
	calculateTimeValue: CalcTimeFromAngle
	updateMeridiem: (meridiem: string) => void
}

const style = css`
	text-align: center;
	padding: 18px 0 14px;
	background: ${CLOCK_WRAPPER_BACKGROUND};
`

export default function ClockWrapper({ mode, calculateTimeValue, time, updateMeridiem }: Props) {
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

			{/* TODO - hide meridiems if 24 hour mode */}
			<Meridiems time={time} updateMeridiem={updateMeridiem} />
		</div>
	)
}
