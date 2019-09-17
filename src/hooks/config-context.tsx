import React, { useContext, createContext, ReactElement, useMemo } from 'react'
import { TimeOutput } from '../helpers/types'

type DoneClickFn = null | ((time: TimeOutput) => void)
type DoneButton = null | ((time: TimeOutput) => ReactElement)

interface Config {
	coarseMinutes: number
	forceCoarseMinutes: boolean
	switchToMinuteOnHourSelect: boolean
	closeOnMinuteSelect: boolean
	hour24Mode: boolean
	onDoneClick: DoneClickFn
	doneButton: DoneButton
}

export type ConfigProps = Partial<Config>

interface Props extends ConfigProps {
	children: ReactElement
}

const configContext = createContext<Config>({} as Config)

export function ConfigProvider({
	children,
	coarseMinutes = 5,
	forceCoarseMinutes = false,
	switchToMinuteOnHourSelect = false,
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
			closeOnMinuteSelect,
			hour24Mode,
			onDoneClick,
			doneButton,
		}
	}, [
		coarseMinutes,
		forceCoarseMinutes,
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
