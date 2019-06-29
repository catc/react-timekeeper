import React from 'react'

export default class Something extends React.Component {
	state = {
		foo: 'fooo',
	}

	render() {
		return (
			<div>
				react timekeeper - {this.state.foo}
				<br />
				<button onClick={() => this.setState({ foo: Math.random() })}>Change</button>
			</div>
		)
	}
}
