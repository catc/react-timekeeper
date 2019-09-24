import React from 'react'

export enum SYNTAX {
	'js' = 'javascript',
	'css' = 'scss',
}

interface Props {
	inline?: boolean
	type?: SYNTAX
	children: React.ReactNode
}

export default function Code({ inline = false, children, type = SYNTAX.js }: Props) {
	if (inline) {
		return <code>{children}</code>
	}

	return (
		<pre>
			<code className={type}>{children}</code>
		</pre>
	)
}
