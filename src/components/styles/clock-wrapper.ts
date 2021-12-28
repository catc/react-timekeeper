import { css } from '@emotion/react'
import { CLOCK_WRAPPER_BACKGROUND } from './constants'

const style = css`
	text-align: center;
	padding: 18px 0 14px;
	background: var(--clock-wrapper-bg, ${CLOCK_WRAPPER_BACKGROUND});
`

export default style
