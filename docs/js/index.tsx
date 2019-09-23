import React from 'react'
import ReactDOM from 'react-dom'
import Content from './content'

ReactDOM.render(<Content />, document.getElementById('root'))

// Use an empty export to please Babel's single file emit.
// https://github.com/Microsoft/TypeScript/issues/15230
export {}
