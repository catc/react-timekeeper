import { css, jsx } from '@emotion/core'
import { CLOCK_WRAPPER_BACKGROUND } from './constants'

export const DONE_BUTTON_COLOR = '#686868'
export const DONE_BUTTON_BORDER_COLOR = '#CCC'

const doneButton = css`
	background: ${CLOCK_WRAPPER_BACKGROUND};
	display: block;
	color: ${DONE_BUTTON_COLOR};
	text-transform: uppercase;
	border-top: 1px solid ${DONE_BUTTON_BORDER_COLOR};
	text-align: center;
	cursor: pointer;
	padding: 16px 0;
	font-size: 13px;
	letter-spacing: 0.5px;
	line-height: normal;
	font-weight: 500;
`

export default doneButton
