import React from 'react'

class Installation extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			// time: '3:70'
			demoTime: '12:45 pm',
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
			<section className="api docs-section">
					<h2>API</h2>
					
						{/* ----- */}
						<h3>
							<code className="name">time</code>&nbsp;
							accepts <span className="accepts">string/object</span>&nbsp;
							(default: <code className="default">null</code>)
						 </h3>
						<div className="api__description">
							<p className="text">Time to set on component. Accepts time in 4 formats:</p>
							<pre><code className="javascript">// string with meridiem
'4:55 pm'
'4:55pm'

// string without meridiem (assumes a 24 hour format)
'16:55'

// object with meridiem
{
	hour: 4,
	minute: 55,
	meridiem: 'pm'
}

// object without meridiem (assumes a 24 hour format)
{
	hour: 16,
	minute: 55
}</code></pre>
						</div>
					
						{/* ----- */}
						<h3>
							<code className="name">onChange</code>&nbsp;
							accepts <span className="accepts">func</span>&nbsp;
							(default: <code className="default">null</code>)
						 </h3>
						<div className="api__description">
							<p className="text">Pass a function to be called when time is changed. Used to store time state in parent component. Function called returns object with updated time.</p>
							<pre><code className="javascript">{
	formatted: '4:55 pm',	// 12 hour format
	formattedSimple: '4:55', 	// similar to formatted (12h), but no meridiem
	formatted24: '16:55',
	hour: 4,
	hour24: 16,
	minute: 55,
	meridiem: 'pm'
}</code></pre>
						</div>	


						{/* ----- */}
						<h3>
							<code className="name">onDoneClick</code>&nbsp;
							accepts <span className="accepts">func</span>&nbsp;
							(default: <code className="default">null</code>)
						 </h3>
						<div className="api__description">
							<p className="text">Displays the "Done" button and calls function when button is clicked. Useful for triggering some action on the parent component, like closing the timepicker.</p>
						</div>	

						{/* ----- */}
						<h3>
							<code className="name">switchToMinuteOnHourSelect</code>&nbsp;
							accepts <span className="accepts">bool</span>&nbsp;
							(default: <code className="default">false</code>)
						 </h3>
						<div className="api__description">
							<p className="text">Changes clock unit from hour to minute after selecting an hour. Exists mainly to provides a better user experience.</p>
						</div>

						{/* ----- */}
						<h3>
							<code className="name">closeOnMinuteSelect</code>&nbsp;
							accepts <span className="accepts">false</span>&nbsp;
							(default: <code className="default">false</code>)
						 </h3>
						<div className="api__description">
							<p className="text">Whether or not to trigger "Done" button click when the user selects minutes. Similar to Google Keep functionality, where once the selects hour and minute, the picker automatically closes.</p>
						</div>	

						{/* ----- */}
						<h3>
							<code className="name">config</code>&nbsp;
							accepts <span className="accepts">object</span>&nbsp;
							(default: <code className="default">null</code>)
						 </h3>
						<div className="api__description">
							<p className="text">Pass in object with any config properties to override. Currently supports overriding style properties. See <a href="https://github.com/catc/react-timekeeper/blob/master/src/helpers/config.js" target="_blank">full list</a> of properties.</p>

							<pre><code className="javascript">// example
<TimeKeeper 
	config={{
		TIMEPICKER_BACKGROUND: 'red',
		FONT_FAMILY: '"Open Sans", sans-serif'
	}}
	// other props...
/> </code></pre>

						</div>	


			</section>
		)
	}
}

export default Installation

