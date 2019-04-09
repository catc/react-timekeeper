import React from 'react'
import {Github, Plug} from './icons'

import Intro_12 from './intro_12'
import Intro_24 from './intro_24'


class Intro extends React.Component {
	render(){
		return (
			<section className="intro-demo">
				<h1>React Timekeeper</h1>
				<p className="intro-description">Time picker based on the style of the <a href="https://play.google.com/store/apps/details?id=com.google.android.keep">Android Google Keep</a> app</p>
				<div className="action-buttons">
					<a href="https://github.com/catc/react-timekeeper"><Github /> Source</a>
					<a href="#examples"><Plug /> Examples</a>
				</div>
				<Intro_12/>
				<Intro_24/>
			</section>
		)
	}
}

export default Intro
