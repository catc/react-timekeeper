import React from 'react'
import TimeKeeper from 'react-timekeeper'
import {Github, Plug} from './icons'

class Intro extends React.Component {
	constructor(props){
		super(props)
		const date = new Date();

		const h = date.getHours() % 12
		const hour = h === 0 ? 12 : h
		const min = ('0' + date.getMinutes()).slice(-2)
		const meridiem = date.getHours > 12 ? 'PM' : 'AM'
		const dateString = `${hour}:${min} ${meridiem}`;
		this.state = {
			demoTime: dateString,
			displayDemo: true
		}

		this.updateDemoTime = this.updateDemoTime.bind(this)
	}
	updateDemoTime(data){
		this.setState({ demoTime: data.formatted})
	}
	toggleDemoDisplay(val){
		this.setState({displayDemo: val})
	}


	render(){
		const state = this.state
		return (
			<section className="intro-demo">
				<h1>React Timekeeper</h1>
				<p className="intro-description">Time picker based on the style of the <a href="https://play.google.com/store/apps/details?id=com.google.android.keep">Android Google Keep</a> app</p>
				<div className="action-buttons">
					<a href="https://github.com/catc/react-timekeeper"><Github /> Source</a>
					<a href="#examples"><Plug /> Examples</a>
				</div>
				<div className="intro-demo-wrapper">
					<div className="intro-demo-picker">
						{state.displayDemo ?
							<div className="intro-demo-picker__wrapper">
								<TimeKeeper
									time={state.demoTime}
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
			</section>
		)
	}
}

export default Intro