import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import '../css/style.scss'

ReactDOM.render(<App />, document.getElementById('root'))

// Use an empty export to please Babel's single file emit.
// https://github.com/Microsoft/TypeScript/issues/15230
export {}
