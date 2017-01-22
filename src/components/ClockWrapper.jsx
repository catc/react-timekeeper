import React, { PropTypes } from 'react'

import Clock from './Clock'

class ClockWrapper extends React.Component {
	constructor(props){
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
	}

	updateTime(key, val){
		this.setState({
			[key]: val
		})
	}
	changeType(){
		let newType = 'hour'
		if (this.state.type === 'hour'){
			newType = 'minute'
		}
		this.setState({ type: newType })
	}

	render(){
		const val = {
			hour: this.state.hour,
			minute: this.state.minute
		}

		/*
			TODO
			- move select logic here
			- and move remaining numbers/positioning and animations to Clock.jsx
		*/

		return (
			<div>
				{this.state.hour}:{this.state.minute}
				<br/>
				<button onClick={this.changeType}>UPDATE TYPE</button>
				<br/>
				<Clock
					type={this.state.type}
					// numbers={hours}
					val={val}
					update={this.updateTime}
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