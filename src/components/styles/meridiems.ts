import { css } from '@emotion/react'

const CLOCK_WRAPPER_MERIDIEM_COLOR = '#898989'
const CLOCK_WRAPPER_MERIDIEM_BACKGROUND_COLOR_SELECTED = '#E1EFF6'
const CLOCK_WRAPPER_MERIDIEM_TEXT_COLOR_SELECTED = '#898989'

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
	background: var(--meridiem-selected-bg-color, ${CLOCK_WRAPPER_MERIDIEM_BACKGROUND_COLOR_SELECTED});
	color: var(--meridiem-selected-text-color, ${CLOCK_WRAPPER_MERIDIEM_TEXT_COLOR_SELECTED});
`

export const meridiem = ({ isRight, isSelected }: Props) => css`
	background: var(--meridiem-bg-color, white);
	font-size: 14px;
	color: var(--meridiem-text-color, ${CLOCK_WRAPPER_MERIDIEM_COLOR});
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
