import React, { useRef } from 'react'
import { css, jsx } from '@emotion/core'

import useConfig from '../hooks/config'
import Clock from './Clock'
import Meridiems from './Meridiems'
import useClockEvents from '../hooks/handle-clock-events'
import { MODE } from '../helpers/constants'
import style from './styles/clock-wrapper'
import { CalcTimeFromAngle, Time } from 'src/helpers/types'

interface Props {
	calculateTimeValue: CalcTimeFromAngle
}

export default function ClockWrapper({ mode, calculateTimeValue, time }: Props) {
	const { hour24Mode } = useConfig()

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
			<Clock clockEl={clock} />

			{!hour24Mode && <Meridiems />}
		</div>
	)
}
