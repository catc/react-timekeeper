import React, { useState } from 'react'

import Clockwrapper from './Clockwrapper'

export default function TimePicker() {
	const [mode, setMode] = useState('hour')

	return (
		<div style={{ padding: 50 }}>
			<button
				onClick={() => {
					setMode(mode === 'hour' ? 'minute' : 'hour')
				}}
			>
				change type - {mode}
			</button>
			<br />
			<br />
			<br />
			<br />

			<div className="clock">
				<Clockwrapper mode={mode} />
			</div>
		</div>
	)
}
