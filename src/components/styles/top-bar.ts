import { css, jsx, keyframes } from '@emotion/core'

const TIME_DEFAULT_COLOR = '#8C8C8C'
const TIME_SELECTED_COLOR = '#8EDDFD'

export const wrapper = css`
	background: white;
	padding: 14px 16px;
	border-radius: 3px 3px 0 0;
`

export const timeWrapper = css`
	left: 20px;
	position: relative;
`

export const hourWrapper = css`
	width: 72px;
	text-align: right;
	position: relative;
	display: inline-block;
`

export const minuteWrapper = css`
	position: relative;
	display: inline-block;
`

export const colon = css`
	color: ${TIME_DEFAULT_COLOR};
	font-weight: 500;
	display: inline-block;
	font-size: 46px;
	vertical-align: 2px;
	margin: 0 5px;
	line-height: normal;
`

const popInOut = keyframes`
	from { transform: scale(1); }
	30% { transform: scale(0.88); }
	60% { transform: scale(1.05); }
	to { transform: scale(1); }
`

const timeSelected = css`
	color: ${TIME_SELECTED_COLOR};
	animation: ${popInOut} 0.6s ease-out;
`

export const time = (isActive: boolean) => css`
	color: ${TIME_DEFAULT_COLOR};
	display: inline-block;
	font-size: 48px;
	cursor: pointer;
	user-select: none;
	line-height: normal;
	${isActive && timeSelected}
`

export const meridiem = css`
	color: ${TIME_DEFAULT_COLOR};
	display: inline-block;
	font-size: 13px;
	text-transform: uppercase;
	margin-left: 2px;
	padding: 10px 8px;
	vertical-align: 1px;
`
