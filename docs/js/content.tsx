import { useLayoutEffect } from 'react'
import { hot } from 'react-hot-loader'
import '../css/style.scss'

// @ts-ignore
import highlight from 'highlight.js/lib'
import 'highlight.js/lib/languages/javascript'
import 'highlight.js/lib/languages/scss'
import 'highlight.js/styles/dracula.css'

import Intro from './sections/intro'
import Installation from './sections/installation'
import API from './sections/api'
import Examples from './sections/examples'
import Other from './sections/other'

function Content() {
	useLayoutEffect(() => {
		highlight.configure({
			tabReplace: '    ',
		})
		highlight.initHighlightingOnLoad()
	}, [])

	return (
		<>
			<Intro />
			<Installation />
			<API />
			<Examples />
			<Other />
		</>
	)
}

export default hot(module)(Content)
