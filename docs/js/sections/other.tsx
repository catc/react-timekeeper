import React from 'react'

import Text from '../components/text'
import Code, { SYNTAX } from '../components/code'

export default function Other() {
	return (
		<section className="docs-section">
			<h2>Custom styles</h2>

			<div className="examples__item">
				<Text>
					For changing colors, each element has a class name you can override properties
					with 1 level of specifity.
				</Text>
				<Code type={SYNTAX.css}>
					{`// won't work because emotion will override your styles
.react-timekeeper__clock-wrapper {
	background: red;
}

// will work since your specificty is higher
.some-wrapper .react-timekeeper__clock-wrapper {
	background: red;
}`}
				</Code>
			</div>
		</section>
	)
}
