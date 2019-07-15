import React, { useEffect, useState, useContext, createContext, ReactElement } from 'react'

// TODO - move these types elsewhere?
interface Style {
	[key: string]: string
}
export interface Styles {
	main?: Style
}

type DoneClickFn = null | (() => void)

interface Config {
	coarseMinutes: number
	styles: Styles
	switchToMinuteOnHourSelect: boolean
	closeOnMinuteSelect: boolean
	onDoneClick: DoneClickFn
	hour24Mode: boolean
}

function genConfig({
	styles = {},
	coarseMinutes = 1,
	switchToMinuteOnHourSelect = false,
	closeOnMinuteSelect = false,
	onDoneClick = null,
	hour24Mode = false,
}: ConfigProps): Config {
	if (coarseMinutes < 1) {
		throw new Error('coarseMinutes must be at least 1')
	}
	return {
		styles,
		coarseMinutes,
		switchToMinuteOnHourSelect,
		closeOnMinuteSelect,
		onDoneClick,
		hour24Mode,
	}
}

export interface ConfigProps {
	styles?: Styles
	coarseMinutes?: number
	switchToMinuteOnHourSelect?: boolean
	closeOnMinuteSelect?: boolean
	onDoneClick?: DoneClickFn
	hour24Mode?: boolean
}

interface Props extends ConfigProps {
	children: ReactElement
}

const configContext = createContext(genConfig({}))

export function ConfigProvider({
	children,
	styles,
	coarseMinutes,
	switchToMinuteOnHourSelect,
	closeOnMinuteSelect,
	onDoneClick,
	hour24Mode,
}: Props) {
	const [config, setConfig] = useState(() =>
		genConfig({
			styles,
			coarseMinutes,
			switchToMinuteOnHourSelect,
			closeOnMinuteSelect,
			onDoneClick,
			hour24Mode,
		}),
	)

	useEffect(() => {
		setConfig(
			genConfig({
				styles,
				coarseMinutes,
				switchToMinuteOnHourSelect,
				closeOnMinuteSelect,
				onDoneClick,
				hour24Mode,
			}),
		)
	}, [
		styles,
		coarseMinutes,
		switchToMinuteOnHourSelect,
		closeOnMinuteSelect,
		onDoneClick,
		hour24Mode,
	])

	return <configContext.Provider value={config}>{children}</configContext.Provider>
}

export default function useConfig(): Config {
	return useContext(configContext)
}
