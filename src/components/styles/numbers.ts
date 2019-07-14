import { css, jsx } from '@emotion/core'
import { CLOCK_NUMBER_COLOR } from './constants'
import { NUMBER_SIZE } from '../../helpers/constants'

export const numbersStyle = css`
	display: inline-block;
	position: absolute;
	color: ${CLOCK_NUMBER_COLOR};
	font-size: 16px;
	pointer-events: none;
	border-radius: 99px;
	width: ${NUMBER_SIZE}px;
	height: ${NUMBER_SIZE}px;
	text-align: center;
	line-height: ${NUMBER_SIZE}px;
	z-index: 5;
`

// z-index required to be on top of clockhand
export const numbersWrapperStyle = css`
	position: absolute;
	left: 0;
	top: 0;
	z-index: 5;
`
