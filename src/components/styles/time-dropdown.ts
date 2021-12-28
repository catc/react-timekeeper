import { css, keyframes } from '@emotion/react'
import { isMinuteMode } from '../../helpers/utils'
import { MODE } from '../../helpers/constants'

const DROPDOWN_BORDER = '#f4f4f4'
const DROPDOWN_COLOR = '#8c8c8c'
const DROPDOWN_COLOR_DISABLED = '#ddd'
const DROPDOWN_SELECTED_COLOR = '#EAF8FF'

const hour = `right: -22px;`
const minute = `right: -10px;`
const hour24 = `
	left: 50%;
	transform: translateX(-50%);
`

const fadeIn = keyframes`
	0% { opacity: 0; }
	100% { opacity: 1; }
`

export const wrapper = (hour24Mode: boolean, mode: MODE) => css`
	position: absolute;
	display: inline-block;
	background: white;
	border: var(--dropdown-border, 1px solid ${DROPDOWN_BORDER});
	border-radius: 2px;
	padding: 6px 0;
	z-index: 20;
	top: 62px;
	height: 250px;
	overflow-y: auto;
	box-shadow: var(
		--dropdown-shadow,
		0 1px 3px rgba(0, 0, 0, 0.12),
		0 1px 2px rgba(0, 0, 0, 0.24)
	);
	opacity: 0;
	animation: ${fadeIn} 0.2s ease-out both;

	${hour24Mode ? hour24 : isMinuteMode(mode) ? minute : hour}
`

export const options = css`
	position: relative;
	list-style: none;
	padding: 0;
	margin: 0;
`

const selected = `background: ${DROPDOWN_SELECTED_COLOR};`

interface OptionStyleProps {
	active: boolean
	enabled: boolean
}

const enabledColor = `var(--dropdown-text-color, ${DROPDOWN_COLOR})`
const disabledColor = `var(--dropdown-text-color-disabled, ${DROPDOWN_COLOR_DISABLED})`

export const option = ({ active, enabled }: OptionStyleProps) => css`
	background: transparent;
	padding: 7px 30px;
	font-size: 16px;
	color: ${enabled ? enabledColor : disabledColor};
	cursor: ${enabled ? 'pointer' : 'not-allowed'};
	&:hover {
		background: ${enabled && `var(--dropdown-hover-bg, ${DROPDOWN_SELECTED_COLOR})`};
	}
	${active && selected}
`
