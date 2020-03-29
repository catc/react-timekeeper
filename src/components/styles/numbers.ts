import { css, jsx } from '@emotion/core'
import {
	NUMBER_RADIUS_REGULAR,
	NUMBER_REGULAR_FONT_SIZE,
	HOUR_24_INNER_FONT_SIZE,
	HOUR_24_OUTER_FONT_SIZE,
} from '../../helpers/constants'

const CLOCK_NUMBER_COLOR = '#999999'

function getFontSize(hour24Mode: boolean, inner: boolean): string {
	if (!hour24Mode) {
		return `var(--numbers-font-size-reg, ${NUMBER_REGULAR_FONT_SIZE}px)`
	}
	return inner
		? `var(--numbers-font-size-inner, ${HOUR_24_INNER_FONT_SIZE}px)`
		: `var(--numbers-font-size-outer, ${HOUR_24_OUTER_FONT_SIZE}px)`
}

interface Props {
	hour24Mode?: boolean
	inner?: boolean
}

export const numbersStyle = ({ hour24Mode = false, inner = false }: Props) => css`
	display: inline-block;
	position: absolute;
	color: var(--numbers-text-color, ${CLOCK_NUMBER_COLOR});
	pointer-events: none;
	border-radius: 99px;
	width: ${NUMBER_RADIUS_REGULAR}px;
	height: ${NUMBER_RADIUS_REGULAR}px;
	text-align: center;
	line-height: ${NUMBER_RADIUS_REGULAR}px;
	z-index: 5;
	font-size: ${getFontSize(hour24Mode, inner)};
`

// z-index required to be on top of clockhand
export const numbersWrapperStyle = css`
	position: absolute;
	left: 0;
	top: 0;
	z-index: 2;
`
