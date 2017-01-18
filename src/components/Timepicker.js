import React from 'react'

import Clock from './Clock'


class Timepicker  extends React.Component {
	constructor(props){
		super(props)
		this.state = {}
	}
	render(){
		return (
			<div>
				timepicker - {this.state.la}
				
				<button onClick={() => {this.setState({la: 'laaaaaaaaaa'})}}>CLICK</button>
				<Clock />
			</div>
		)
	}
}
/*const Timepicker = ({}) => {
	return (
		<div>
			timepicker

			<Clock />
		</div>
	)
}*/

export default Timepicker