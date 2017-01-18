'use strict';

import React from 'react'
import { render } from 'react-dom'

import Keep from 'keep-timepicker'

import '../scss/main.scss'

render(
	/*React.createElement(someel)*/
	<Keep />,
	//<div>app</div>,
	document.getElementById('root')
)
