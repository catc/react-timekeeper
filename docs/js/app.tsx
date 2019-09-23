import React, { useState, useEffect, useCallback } from 'react'
import { hot } from 'react-hot-loader'
import '../css/style.scss'

import Timekeeper from '@tk'

// import Box from './foo'
// import Timekeeper from '../../lib/index'

function AnExample() {
	const [hour24Mode, sethour24Mode] = useState(false) // TODO - remove
	const [show, setShow] = useState(true) // TODO - remove
	const [time, updateTime] = useState({ hour: 1, minute: 50, formatted: '5:40' })
	// const [time, updateTime] = useState({ hour: 1, minute: 40, formatted: '5:40' })

	useEffect(() => {
		// setInterval(() => {
		// 	console.log(document.activeElement)
		// }, 1000)
	}, [])

	const c = useCallback((time) => {
		// console.log('time changed on parent ::', time)
		updateTime(time)
	}, [])

	// const [temp] = useState({ hour: 5, minute: 4 })
	return (
		<div className="main-big-wrapper">
			TIME: {time.formatted12}
			<button className="" onClick={() => sethour24Mode(!hour24Mode)}>
				{hour24Mode ? '24 hrs' : '12 hrs'}
			</button>
			{/* <Box/> */}
			{/* <StyleTest /> */}
			<br />
			{show ? (
				<div className="">
					<button onClick={() => setShow(false)}>Hide</button>
					<button onClick={() => updateTime({ hour: 3, minute: 20 })}>
						Change to 3:20
					</button>
					<button onClick={() => updateTime({ hour: 9, minute: 45 })}>
						Change to 9:45
					</button>

					<br />
					<br />

					<div style={{ verticalAlign: 'top' }} className="all-clocks">
						<Timekeeper
							// time={temp}
							// time={{ hour: time.hour, minute: time.minute }}
							// onChange={(val) => {
							// 	// console.log('change is', val)
							// 	// TODO - use updateTime
							// 	// console.log('SETTING TIME ON PARENT', `${val.hour}:${val.minute}`, val)
							// 	updateTime(val)
							// }}
							onChange={c}
							switchToMinuteOnHourSelect
							closeOnMinuteSelect
							// forceCoarseMinutes
							// doneButton={(time) => (
							// 	<button
							// 		onClick={() =>
							// 			console.log('can call a local method with ', time)
							// 		}
							// 	>
							// 		Done
							// 	</button>
							// )}
							onDoneClick={(time) => console.log('done was clicked', time)}
							// doneButton={
							// 	<button
							// 		onClick={() => {
							// 			console.log('finished')
							// 		}}
							// 	>
							// 		done
							// 	</button>
							// }
							// coarseMinutes={10}
							hour24Mode={hour24Mode}
							// styles={{
							// 	numbers: { color: 'red' },
							// 	// main: { background: 'green' },
							// 	// doneButton: { background: 'red' },
							// 	custom: `.bar { background: black; }`,
							// }}
						/>

						{/* <Timekeeper time={{ hour: 12, minute: 50 }} hour24Mode={hour24Mode} /> */}
						{/* <Timekeeper time={{ hour: 12, minute: 50 }} /> */}
						{/* <Timekeeper time={{ hour: 6, minute: 50 }} hour24Mode={hour24Mode} /> */}
						{/* <Timekeeper time={{ hour: 6, minute: 50 }} /> */}
					</div>
				</div>
			) : (
				<button onClick={() => setShow(true)}>Show</button>
			)}
			<p style={{ border: '1px solid lightgrey', height: 800 }}></p>
		</div>
	)
}

class App extends React.Component<{}, {}> {
	render() {
		return (
			<div>
				<AnExample />
			</div>
		)
	}
}

export default hot(module)(App)
