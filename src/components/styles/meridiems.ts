import { css, jsx } from '@emotion/core'
import {
	CLOCK_WRAPPER_MERIDIEM_COLOR,
	CLOCK_WRAPPER_MERIDIEM_BACKGROUND_COLOR_SELECTED,
	CLOCK_WRAPPER_MERIDIEM_TEXT_COLOR_SELECTED,
} from './constants'

const MERIDIEM_SELECT_SIZE = 38

export const meridiemWrapper = css`
	text-align: left;
	padding: 0 30px;
	margin-top: -16px;
	position: relative;
	z-index: 10;
`

interface Props {
	isRight?: boolean
	isSelected: boolean
}

const right = `
	float: right;
`

const selected = `
	background: ${CLOCK_WRAPPER_MERIDIEM_BACKGROUND_COLOR_SELECTED};
	color: ${CLOCK_WRAPPER_MERIDIEM_TEXT_COLOR_SELECTED};
`

export const meridiem = ({ isRight, isSelected }: Props) => css`
	background: white;
	font-size: 14px;
	color: ${CLOCK_WRAPPER_MERIDIEM_COLOR};
	display: inline-block;
	padding: 0;
	cursor: pointer;
	border-radius: 99px;
	width: ${MERIDIEM_SELECT_SIZE}px;
	height: ${MERIDIEM_SELECT_SIZE}px;
	text-align: center;
	line-height: ${MERIDIEM_SELECT_SIZE}px;
	transition: 0.15s ease-out;

	// conditionals
	${isRight && right}
	${isSelected && selected}
`
