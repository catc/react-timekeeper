import React from 'react'

import '../scss/main.scss'

// lib
import highlight from 'highlight.js/lib'
import 'highlight.js/lib/languages/javascript'
import 'highlight.js/styles/dracula.css'
// import 'highlight.js/styles/monokai-sublime.css'
// import 'highlight.js/styles/atom-one-dark.css'
// import 'highlight.js/styles/androidstudio.css'

// sections
import Intro from './intro'
import Installation from './installation'
import Api from './api'
import Examples from './examples'

class Content extends React.Component {
	componentDidMount(){
		highlight.initHighlightingOnLoad();
	}

	render(){
		return (
			<div>
				<Intro />
				<Installation />
				<Api />
				<Examples />
			</div>
		)
	}
}

export default Content