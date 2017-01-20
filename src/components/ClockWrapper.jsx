import React, { PropTypes } from 'react'

import Clock from './Clock'

class ClockWrapper extends React.Component {
	constructor(props){
		super(props)

		this.state = {
			minute: 10,
			hour: 2
		}

		this.updateMinute = this.updateTime.bind(this, 'minute')
		this.updateHour = this.updateTime.bind(this, 'hour')
	}

	updateTime(key, val){
		this.setState({
			[key]: val
		})
	}

	render(){
		// TODO - change this to string
		const hours = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
		const minutes = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 0]

		return (
			<div>
				{this.state.hour}:{this.state.minute}
				<br/>
				<Clock
					numbers={hours}
					val={this.state.hour}
					update={this.updateHour}
					increments={12}
				/>
				<Clock
					numbers={minutes}
					val={this.state.minute}
					update={this.updateMinute}
					increments={60}
				/>

			</div>
		)
	}
}

export default ClockWrapper