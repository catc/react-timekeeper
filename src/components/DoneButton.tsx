import useConfig from '../hooks/useConfigContext'
import style from './styles/done-button'
import useTimekeeperState from '../hooks/useStateContext'

export default function DoneButton() {
	const { onDoneClick, doneButton } = useConfig()
	const { getComposedTime } = useTimekeeperState()

	if (doneButton) {
		return doneButton(getComposedTime())
	}

	if (onDoneClick) {
		return (
			<span
				css={style}
				onClick={e => onDoneClick(getComposedTime(), e)}
				className="react-timekeeper__done-button"
				data-testid="done-button"
			>
				Done
			</span>
		)
	}
	return null
}
