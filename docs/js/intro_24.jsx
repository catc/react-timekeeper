import React from 'react'
import TimeKeeper from 'react-timekeeper'


class Intro_24 extends React.Component {
	constructor(props){
		super(props)
		const date = new Date();

		const hour = date.getHours()
		const min = ('0' + date.getMinutes()).slice(-2)
		const dateString = `${hour}:${min}`;
		this.state = {
			demoTime: dateString,
			displayDemo: true
		}

		this.updateDemoTime = this.updateDemoTime.bind(this)
	}
	updateDemoTime(data){
		this.setState({ demoTime: data.formatted24 })
	}
	toggleDemoDisplay(val){
		this.setState({displayDemo: val})
	}


	render(){
		const state = this.state
		return (
			<div className="intro-demo-wrapper">
				<div className="intro-demo-picker">
					{state.displayDemo ?
						<div className="intro-demo-picker__wrapper">
							<TimeKeeper
								time={state.demoTime}
								hourMode={'hour24'}
								onChange={this.updateDemoTime}
								onDoneClick={() => {
									this.toggleDemoDisplay(false)
								}}
								switchToMinuteOnHourSelect={true}
							/>
						</div>
						:
						false
					}
				</div>
				<span
					onClick={() => {this.toggleDemoDisplay(true) }}
					className="selected-demo-time"
				>The time is currently <strong>{state.demoTime}</strong>
					{this.state.displayDemo ? false : <span className="selected-demo-time__hint">Click to open</span>}
				</span>
			</div>
		)
	}
}

export default Intro_24
