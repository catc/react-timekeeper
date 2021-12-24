import React, { useContext, createContext, ReactElement, useMemo } from 'react'
import { TimeOutput } from '../helpers/types'

type DoneClickFn = null | ((time: TimeOutput, Event?: React.MouseEvent) => void)
type DoneButton = null | ((time: TimeOutput) => ReactElement)

interface Config {
	coarseMinutes: number
	forceCoarseMinutes: boolean
	/*
		TODO - better naming for next major version
		maybe: autoSwitchMode ?
	*/
	switchToMinuteOnHourSelect: boolean
	switchToMinuteOnHourDropdownSelect: boolean
	closeOnMinuteSelect: boolean
	hour24Mode: boolean
	onDoneClick: DoneClickFn
	doneButton: DoneButton
}

export type ConfigProps = Partial<Config>

interface Props extends ConfigProps {
	children: ReactElement
}

export const configContext = createContext<Config>({} as Config)

export function ConfigProvider({
	children,
	coarseMinutes = 5,
	forceCoarseMinutes = false,
	switchToMinuteOnHourSelect = false,
	switchToMinuteOnHourDropdownSelect = false,
	closeOnMinuteSelect = false,
	hour24Mode = false,
	onDoneClick = null,
	doneButton = null,
}: Props) {
	const config = useMemo(() => {
		if (coarseMinutes < 1) {
			throw new Error('coarseMinutes must be at least 1')
		}
		return {
			coarseMinutes,
			forceCoarseMinutes,
			switchToMinuteOnHourSelect,
			switchToMinuteOnHourDropdownSelect,
			closeOnMinuteSelect,
			hour24Mode,
			onDoneClick,
			doneButton,
		}
	}, [
		coarseMinutes,
		forceCoarseMinutes,
		switchToMinuteOnHourSelect,
		switchToMinuteOnHourDropdownSelect,
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
