import Link from '../components/link'
import Text from '../components/text'
import Code, { SYNTAX } from '../components/code'

export default function Intro() {
	return (
		<section className="installation docs-section" id="docs">
			<h2>Installation and Usage</h2>

			<Text>
				Install <Code inline>react-timekeeper</Code> via npm.
			</Text>
			<Code>npm install --save react-timekeeper</Code>

			<Text>
				The latest version of timekeeper (v2+) requires{' '}
				<Link href="https://reactjs.org/blog/2019/02/06/react-v16.8.0.html">
					react hooks (v16.8)
				</Link>
				. If you&apos;re using an older version of react, install timekeeper v1
				via:
			</Text>
			<Code>npm install --save react-timekeeper@^1.0.0</Code>

			<Text>
				Usage is simple: just import the library javascript and use it in the
				render function. No external css imports are required since all styles are
				inlined using{' '}
				<Link href="https://github.com/emotion-js/emotion">emotion</Link>.
			</Text>

			<Code type={SYNTAX.js}>
				{`import React from 'react';
import TimeKeeper from 'react-timekeeper';

function MyComponent {
	return (
		<div>
			<TimeKeeper />;
		</div>	
	)
}`}
			</Code>
		</section>
	)
}
