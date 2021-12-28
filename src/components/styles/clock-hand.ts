import { css } from '@emotion/react'

const CLOCK_HAND_ARM = '#bceaff'
const CLOCK_HAND_CIRCLE_BACKGROUND = '#e6f7ff'
const CLOCK_HAND_INTERMEDIATE_CIRCLE_BACKGROUND = '#ade2fb'

export const line = css`
	stroke: var(--hand-line-color, ${CLOCK_HAND_ARM});
`

export const centerCircle = css`
	fill: var(--hand-circle-center, ${CLOCK_HAND_ARM});
`

export const outerCircle = css`
	fill: var(--hand-circle-outer, ${CLOCK_HAND_CIRCLE_BACKGROUND});
`

export const intermediateMinuteCircle = css`
	fill: var(--hand-minute-circle, ${CLOCK_HAND_INTERMEDIATE_CIRCLE_BACKGROUND});
`
