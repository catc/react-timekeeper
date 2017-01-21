import React, { PropTypes } from 'react'

import Clock from './Clock'

class ClockWrapper extends React.Component {
	constructor(props){
		super(props)

		this.state = {
			minute: 10,
			hour: 2,

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
		// TODO - change this to string
		const hours = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
		const minutes = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 0]

		/*const hourClock = {
			type: 'hour',
			component: <Clock
				numbers={hours}
				val={this.state.hour}
				update={this.updateHour}
				increments={12}
			/>
		}
		const minuteClock = {
			type: 'minute',
			component: <Clock
				numbers={minutes}
				val={this.state.minute}
				update={this.updateMinute}
				increments={60}
			/>
		}*/
		const val = {
			hour: this.state.hour,
			minute: this.state.minute
		}

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