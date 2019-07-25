import React, { useEffect, useState, useContext, createContext, ReactElement } from 'react'

// TODO - move these types elsewhere?
interface Style {
	[key: string]: string
}
export interface Styles {
	main?: Style
}

type DoneClickFn = null | (() => void)
type DoneButton = null | ReactElement

interface Config {
	coarseMinutes: number
	styles: Styles
	switchToMinuteOnHourSelect: boolean
	closeOnMinuteSelect: boolean
	hour24Mode: boolean
	onDoneClick: DoneClickFn
	doneButton: DoneButton
}

function genConfig({
	styles = {},
	coarseMinutes = 1,
	switchToMinuteOnHourSelect = false,
	closeOnMinuteSelect = false,
	hour24Mode = false,
	onDoneClick = null,
	doneButton = null,
}: ConfigProps): Config {
	if (coarseMinutes < 1) {
		throw new Error('coarseMinutes must be at least 1')
	}
	return {
		styles,
		coarseMinutes,
		switchToMinuteOnHourSelect,
		closeOnMinuteSelect,
		hour24Mode,
		onDoneClick,
		doneButton,
	}
}

export interface ConfigProps {
	styles?: Styles
	coarseMinutes?: number
	switchToMinuteOnHourSelect?: boolean
	closeOnMinuteSelect?: boolean
	hour24Mode?: boolean
	onDoneClick?: DoneClickFn
	doneButton?: DoneButton
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
	hour24Mode,
	onDoneClick,
	doneButton,
}: Props) {
	const [config, setConfig] = useState(() =>
		genConfig({
			styles,
			coarseMinutes,
			switchToMinuteOnHourSelect,
			closeOnMinuteSelect,
			onDoneClick,
			hour24Mode,
			doneButton,
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
				doneButton,
			}),
		)
	}, [
		styles,
		coarseMinutes,
		switchToMinuteOnHourSelect,
		closeOnMinuteSelect,
		onDoneClick,
		hour24Mode,
		doneButton,
	])

	return <configContext.Provider value={config}>{children}</configContext.Provider>
}

export default function useConfig(): Config {
	return useContext(configContext)
}
