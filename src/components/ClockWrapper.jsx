import React, { PropTypes } from 'react'

import Clock from './Clock'

class ClockWrapper extends React.Component {
	render(){
		const props = this.props
		/*
			TODO
			- move select logic here
			- and move remaining numbers/positioning and animations to Clock.jsx
		*/

		return (
			<div>
				
				<button onClick={() => {
					if (props.unit === 'hour'){
						props.changeUnit('minute')
					} else {
						props.changeUnit('hour')
					}
				}}>UPDATE TYPE</button>
				<br/>
				<br/>

				<Clock
					hour={props.hour}
					minute={props.minute}
					unit={props.unit}

					changeUnit={props.changeUnit}
					changeHour={props.changeHour}
					changeMinute={props.changeMinute}
				/>

				{/* TODO - add meridiem */}
			</div>
		)
	}
}

export default ClockWrapper