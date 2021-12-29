import { css } from '@emotion/react'
import {
	NUMBER_RADIUS_REGULAR,
	NUMBER_REGULAR_FONT_SIZE,
	HOUR_24_INNER_FONT_SIZE,
	HOUR_24_OUTER_FONT_SIZE,
} from '../../helpers/constants'

const CLOCK_NUMBER_COLOR = '#999999'
const CLOCK_NUMBER_COLOR_DISABLED = '#ddd'

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
	enabled?: boolean
}

const enabledColor = `var(--numbers-text-color, ${CLOCK_NUMBER_COLOR})`
const disabledColor = `var(--numbers-text-color-disabled, ${CLOCK_NUMBER_COLOR_DISABLED})`

export const numbersStyle = ({
	hour24Mode = false,
	inner = false,
	enabled = true,
}: Props) => css`
	display: inline-block;
	position: absolute;
	color: ${enabled ? enabledColor : disabledColor};
	transition: color 0.15s ease-out;
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
