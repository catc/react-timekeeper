import { css, jsx } from '@emotion/core'
import { DONE_BUTTON_COLOR, DONE_BUTTON_BORDER_COLOR, CLOCK_WRAPPER_BACKGROUND } from './constants'

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
