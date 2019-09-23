import React from 'react'

interface Props {
	samePage?: boolean
	href?: string
	children: React.ReactNode
}

export default function Link({ href = '', children, samePage = false }: Props) {
	const props: any = {}
	if (!samePage) {
		props.target = '_blank'
		props.rel = 'noopener noreferrer'
	}

	return (
		<a href={href} {...props}>
			{children}
		</a>
	)
}
