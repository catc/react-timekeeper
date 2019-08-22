import React, { useCallback } from 'react'
import { jsx } from '@emotion/core'

import { meridiemWrapper, meridiem } from './styles/meridiems'
import useTimekeeperState from '../hooks/state-context'
import { MERIDIEM } from '../helpers/constants'

export default function Meridiems() {
	const { time, updateMeridiem } = useTimekeeperState()

	const setAM = useCallback(() => {
		updateMeridiem(MERIDIEM.am)
	}, [updateMeridiem])
	const setPM = useCallback(() => {
		updateMeridiem(MERIDIEM.pm)
	}, [updateMeridiem])

	const isPM = time.hour >= 12

	return (
		<div css={meridiemWrapper}>
			<button
				type="button"
				css={meridiem({ isSelected: !isPM })}
				className="react-timekeeper-button-reset react-timekeeper__meridiem-toggle"
				onClick={setAM}
			>
				AM
			</button>
			<button
				type="button"
				css={meridiem({ isRight: true, isSelected: isPM })}
				className="react-timekeeper-button-reset react-timekeeper__meridiem-toggle"
				onClick={setPM}
			>
				PM
			</button>
		</div>
	)
}
