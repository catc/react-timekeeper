import React from 'react'
import { css, jsx } from '@emotion/core'

import useConfig from '../hooks/config'
import style from './styles/done-button'

export default function DoneButton() {
	const { onDoneClick, doneButton } = useConfig()

	if (doneButton) {
		return doneButton
	}
	if (onDoneClick) {
		return (
			<span css={style} onClick={onDoneClick}>
				Done
			</span>
		)
	}
	return null
}
