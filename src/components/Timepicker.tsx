import React, { useState, useCallback } from 'react'

import ClockWrapper from './ClockWrapper'

/*
	TODO
	- handle actions here
*/

export default function TimePicker() {
	const [mode, setMode] = useState('hour')

	const [show, setShow] = useState(true)

	const handleChange = useCallback(() => {
		return function(a, b, c) {
			console.log('it was changed', a, b, c)
		}
	}, [])

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

			{show ? (
				<div className="">
					<ClockWrapper mode={mode} />

					<br />
					<br />
					<button onClick={() => setShow(false)}>Hide</button>
				</div>
			) : (
				<button onClick={() => setShow(true)}>Show</button>
			)}
		</div>
	)
}
