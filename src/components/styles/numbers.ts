import { css, jsx } from '@emotion/core'
import { CLOCK_NUMBER_COLOR } from './constants'
import { NUMBER_SIZE } from '../../helpers/constants'

interface Props {
	hour24Mode?: boolean
	inner?: boolean
	outer?: boolean
}

// TODO - better function and move this elsewhere (with other anim related stuff?)
function calcSize(hour24Mode: boolean, inner: boolean, outer: boolean): number {
	if (!hour24Mode) {
		return 16
	}
	return inner ? 15 : 13
}

export const numbersStyle = ({ hour24Mode, inner, outer }: Props) => css`
	display: inline-block;
	position: absolute;
	color: ${CLOCK_NUMBER_COLOR};
	pointer-events: none;
	border-radius: 99px;
	width: ${NUMBER_SIZE}px;
	height: ${NUMBER_SIZE}px;
	text-align: center;
	line-height: ${NUMBER_SIZE}px;
	z-index: 5;
	font-size: ${calcSize(hour24Mode, inner, outer)}px;
`

// z-index required to be on top of clockhand
export const numbersWrapperStyle = css`
	position: absolute;
	left: 0;
	top: 0;
	z-index: 5;
`
