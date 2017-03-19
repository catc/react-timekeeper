import React from 'react'
import TimeKeeper from 'react-timekeeper'

class Installation extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			example1Time: '12:23 pm',
			example2Time: '6:50 am',
			example2TimeDisplay: true,
			example3Time: '2:50',
		}

		this.updateDemoTime = this.updateDemoTime.bind(this)
	}
	updateDemoTime(demo, data){
		this.setState({ [`example${demo}Time`]: data.formatted})
	}
	toggleDemoDisplay(demo, val){
		this.setState({ [`example${demo}TimeDisplay`]: val })
	}


	render(){
		const state = this.state

		return (
			<section className="examples docs-section" id="examples">
					<h2>Examples</h2>

					{/* ----- */}
					<p className="text">Basic example demonstrating passing in <code>time</code> and updating time on parent component via <code>onChange</code> function.</p>
					<div className="examples__example-1">
						<div className="examples__example-1-timekeeper-wrapper">
							<TimeKeeper
								time={this.state.example1Time}
								onChange={data => this.updateDemoTime(1, data)}
							/>
						</div>
						<span className="examples__example-1-time">Time is {state.example1Time}</span>
					</div>

					<pre><code className="javascript">import React from 'react';
import TimeKeeper from 'react-timekeeper';

class YourComponent extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			time: '12:34 pm'
		}
		this.handleTimeChange = this.handleTimeChange.bind(this)
	}
	handleTimeChange(newTime){
		this.setState({ time: newTime.formatted})
	}
	render(){
		return (
			<div>
				<TimeKeeper
					time={this.state.time}
					onChange={this.handleTimeChange}
				/>;
				<span>Time is {this.state.time}</span>
			</div>
		)
	}
} </code></pre>


					{/* ----- */}
					<p className="text">Change unit to minutes after selecting hour, and close time picker on clicking "done" button.</p>
					<div className="examples__example-2">
						{this.state.example2TimeDisplay ?
							<div className="examples__example-2-timekeeper-wrapper">
								<TimeKeeper
									time={this.state.example2Time}
									onChange={data => this.updateDemoTime(2, data)}
									onDoneClick={() => {
										this.toggleDemoDisplay(2, false)
									}}
									switchToMinuteOnHourSelect={true}
								/>
							</div>
							:
							false
						}
						<span className="examples__example-2-time">
							Time is {state.example2Time}
							{this.state.example2TimeDisplay ? false : <span className="examples__example-2-open" onClick={() => {this.toggleDemoDisplay(2, true) }}>Open</span>}
						</span>
					</div>
				
					<pre><code className="javascript">import React from 'react';
import TimeKeeper from 'react-timekeeper';

class YourComponent extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			time: '6:50 am',
			displayTimepicker: true
		}
		this.handleTimeChange = this.handleTimeChange.bind(this)
	}
	handleTimeChange(newTime){
		this.setState({ time: newTime.formatted})
	}
	toggleTimekeeper(val){
		this.setState({displayTimepicker: val})
	}
	render(){
		return (
			<div>
				{this.state.displayTimepicker ?
					<TimeKeeper
						time={this.state.time}
						onChange={this.handleTimeChange}
						onDoneClick={() => {
							this.toggleTimekeeper(false)
						}}
						switchToMinuteOnHourSelect={true}
					/>;
					:
					false
				}
				<span>Time is {this.state.time}</span>
				<button onClick={() => this.toggleTimekeeper(true)}>OPEN</button>
			</div>
		)
	}
} </code></pre>


					{/* ----- */}
					<p className="text">Change "done" button colors via config.</p>
					<div className="examples__example-3">
						<div className="examples__example-3-timekeeper-wrapper">
							<TimeKeeper
								time={this.state.example1Time}
								onChange={data => this.updateDemoTime(3, data)}
								config={{
									TIMEPICKER_BACKGROUND: 'white',
									DONE_BUTTON_COLOR: '#64c9f1',
									DONE_BUTTON_BORDER_COLOR: '#ededed'
								}}
								onDoneClick={() => {}}
							/>
						</div>
					</div>

					<pre><code className="javascript">import React from 'react';
import TimeKeeper from 'react-timekeeper';

class YourComponent extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			time: '2:50 pm'
		}
		this.handleTimeChange = this.handleTimeChange.bind(this)
	}
	handleTimeChange(newTime){
		this.setState({ time: newTime.formatted})
	}
	render(){
		return (
			<div>
				<TimeKeeper
					time={this.state.time}
					onChange={this.handleTimeChange}
					config={{
						TIMEPICKER_BACKGROUND: 'white',
						DONE_BUTTON_COLOR: '#64c9f1',
						DONE_BUTTON_BORDER_COLOR: '#ededed'
					}}
					onDoneClick={() => {}}
				/>;
			</div>
		)
	}
} </code></pre>

			</section>
		)
	}
}

export default Installation