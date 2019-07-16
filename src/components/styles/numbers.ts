import { css, jsx } from '@emotion/core'
import { CLOCK_NUMBER_COLOR } from './constants'
import { NUMBER_RADIUS_REGULAR, getFontSize } from '../../helpers/constants'

interface Props {
	hour24Mode?: boolean
	inner?: boolean
}

export const numbersStyle = ({ hour24Mode = false, inner = false }: Props) => css`
	display: inline-block;
	position: absolute;
	color: ${CLOCK_NUMBER_COLOR};
	pointer-events: none;
	border-radius: 99px;
	width: ${NUMBER_RADIUS_REGULAR}px;
	height: ${NUMBER_RADIUS_REGULAR}px;
	text-align: center;
	line-height: ${NUMBER_RADIUS_REGULAR}px;
	z-index: 5;
	font-size: ${getFontSize(hour24Mode, inner)}px;
`

// z-index required to be on top of clockhand
export const numbersWrapperStyle = css`
	position: absolute;
	left: 0;
	top: 0;
	z-index: 2;
`
