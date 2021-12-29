import { useCallback } from 'react'

import { meridiemWrapper, meridiem } from './styles/meridiems'
import useTimekeeperState from '../hooks/useStateContext'
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
				data-testid="meridiem_am"
				className={`react-timekeeper-button-reset react-timekeeper__meridiem-toggle ${
					!isPM ? 'react-timekeeper__meridiem--active' : ''
				}`}
				onClick={setAM}
			>
				AM
			</button>
			<button
				type="button"
				css={meridiem({ isRight: true, isSelected: isPM })}
				data-testid="meridiem_pm"
				className={`react-timekeeper-button-reset react-timekeeper__meridiem-toggle ${
					isPM ? 'react-timekeeper__meridiem--active' : ''
				}`}
				onClick={setPM}
			>
				PM
			</button>
		</div>
	)
}
