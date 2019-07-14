import React, { useCallback } from 'react'
import { jsx } from '@emotion/core'

import { meridiemWrapper, meridiem } from './styles/meridiems'
import { Time } from 'src/helpers/types'

interface Props {
	time: Time
	updateMeridiem: (meridiem: string) => void
}

export default function Meridiems({ time, updateMeridiem }: Props) {
	const setAM = useCallback(() => {
		updateMeridiem('am')
	}, [updateMeridiem])
	const setPM = useCallback(() => {
		updateMeridiem('pm')
	}, [updateMeridiem])

	const isPM = time.hour >= 12

	return (
		<div css={meridiemWrapper}>
			<button
				type="button"
				css={meridiem({ isSelected: !isPM })}
				className="react-timekeeper-button-reset"
				onClick={setAM}
			>
				AM
			</button>
			<button
				type="button"
				css={meridiem({ isRight: true, isSelected: isPM })}
				className="react-timekeeper-button-reset"
				onClick={setPM}
			>
				PM
			</button>
		</div>
	)
}
