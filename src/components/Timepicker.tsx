import React, { useState } from 'react'

import Clockwrapper from './Clockwrapper'

function typeset() {
	return (
		<div>
			<button
				onClick={() => {
					setType(type === 'hours' ? 'minutes' : 'hours')
				}}
			>
				change type - {type}
			</button>
		</div>
	)
}

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
