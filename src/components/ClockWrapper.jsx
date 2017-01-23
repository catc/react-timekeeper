import React, { PropTypes } from 'react'

import Clock from './Clock'

class ClockWrapper extends React.Component {
	/*constructor(props){
		super(props)

		this.state = {
			minute: 10,
			hour: 8,

			type: 'hour'
		}

		// this.updateMinute = this.updateTime.bind(this, 'minute')
		// this.updateHour = this.updateTime.bind(this, 'hour')
		this.updateTime = this.updateTime.bind(this)
		this.changeType = this.changeType.bind(this)
	}*/

	/*updateTime(key, val){
		this.setState({
			[key]: val
		})
	}*/
	/*changeType(){
		let newType = 'hour'
		if (this.state.type === 'hour'){
			newType = 'minute'
		}
		this.setState({ type: newType })
	}*/

	render(){
		const props = this.props
		
		const val = {
			hour: this.props.hour,
			minute: this.props.minute
		}

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
					// type={this.state.type}
					// numbers={hours}
					unit={props.unit}
					val={val}
					// update={this.updateTime}

					changeUnit={props.changeUnit}
					changeHour={props.changeHour}
					changeMinute={props.changeMinute}
					// update={this.updateHour}
					// increments={12}
				/>
				{/*<Clock
					numbers={minutes}
					val={this.state.minute}
					update={this.updateMinute}
					increments={60}
				/>*/}

			</div>
		)
	}
}

export default ClockWrapper