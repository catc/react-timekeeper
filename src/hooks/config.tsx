import React, { useEffect, useState, useContext, createContext, ReactElement } from 'react'

// TODO - move these types elsewhere?
interface Style {
	[key: string]: string
}
export interface Styles {
	main?: Style
}

interface Config {
	styles: Styles
}

const configContext = createContext(genConfig())

function genConfig(styles = {} /* any other config stuff */) {
	return {
		styles,
	}
}

interface Props {
	children: ReactElement
	styles?: {}
}

export function ConfigProvider({ children, styles }: Props) {
	const [config, setConfig] = useState(genConfig(styles))

	useEffect(() => {
		setConfig(genConfig(styles))
	}, [styles])

	return <configContext.Provider value={config}>{children}</configContext.Provider>
}

export default function useConfig(): Config {
	return useContext(configContext)
}
