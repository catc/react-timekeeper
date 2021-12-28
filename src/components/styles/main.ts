import { css } from '@emotion/react'
import { CLOCK_RADIUS } from '../../helpers/constants'

const CLOCK_WIDTH_PADDING = 20

const timepicker = css`
	-webkit-tap-highlight-color: transparent;
	-webkit-font-smoothing: antialiased;
	font-smoothing: antialiased;

	font-family: var(--main-font-family, 'Roboto', sans-serif);
	background: var(--main-bg, white);
	box-shadow: var(
		--main-box-shadow,
		0 3px 11px rgba(0, 0, 0, 0.1),
		0 3px 6px rgba(0, 0, 0, 0.15)
	);
	border-radius: 3px;
	display: inline-block;
	width: ${CLOCK_RADIUS * 2 + CLOCK_WIDTH_PADDING * 2}px;
	position: relative;
	user-select: none;
`

export default timepicker
