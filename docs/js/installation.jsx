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
			<section className="installation docs-section" id="docs">
				<h2>Installation and Usage</h2>
				<p className="text">
					Install <code>react-timekeeper</code> via npm.
				</p>
				<pre><code className="javascript">npm install --save react-timekeeper </code></pre>
				
				<p className="text">
					Usage is simple: just import the library javascript and use it in the render function. No external css imports are required since all styles are inlined using <a href="https://github.com/FormidableLabs/radium" target="_blank">radium</a>.
				</p>
				<pre><code className="javascript">import React from 'react';
import TimeKeeper from 'react-timekeeper';

class YourComponent extends React.Component {
	render(){
		return <TimeKeeper />;
	}
} </code></pre>
			</section>
		)
	}
}

export default Installation

