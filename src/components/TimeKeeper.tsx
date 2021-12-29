import { Global, css } from '@emotion/react'

import globalStyle from './styles/global'
import style from './styles/main'
import TopBar from './TopBar'
import ClockWrapper from './ClockWrapper'
import DoneButton from './DoneButton'

export default function TimeKeeper() {
	return (
		<>
			<Global styles={css(globalStyle)} />

			<div className="react-timekeeper" css={style}>
				<TopBar />
				<ClockWrapper />
				<DoneButton />
			</div>
		</>
	)
}
