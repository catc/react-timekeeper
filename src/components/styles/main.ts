import { css, jsx } from '@emotion/core'

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
	width: 260px;
	position: relative;
	user-select: none;
`

export default timepicker
