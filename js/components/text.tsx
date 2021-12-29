import React from 'react'

interface Props {
	children: React.ReactNode
}

export default function Text({ children }: Props) {
	return <p className="text">{children}</p>
}
