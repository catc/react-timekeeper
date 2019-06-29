import React from 'react'
import { hot } from 'react-hot-loader'

class MyComponent extends React.Component<{}, {}> {
	state = {
		foo: 'foo',
	}

	change = () => {
		this.setState({ foo: Math.random() })
	}
	render() {
		return (
			<div onClick={this.change}>
				{this.state.foo}
				wef
			</div>
		)
	}
}

class App extends React.Component<{}, {}> {
	render() {
		return (
			<div>
				root
				<MyComponent></MyComponent>
			</div>
		)
	}
}

export default hot(module)(App)
