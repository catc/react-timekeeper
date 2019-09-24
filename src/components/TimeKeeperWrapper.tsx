import React from 'react'
import TimeKeeper from './TimeKeeper'
import { ConfigProvider, ConfigProps } from '../hooks/config-context'
import { StateProvider } from '../hooks/state-context'
import { TimeInput, ChangeTimeFn } from '../helpers/types'

interface Props extends ConfigProps {
	time?: TimeInput
	onChange?: ChangeTimeFn
}

export default function TimepickerWithConfig({
	time,
	onChange,
	// config props:
	coarseMinutes,
	forceCoarseMinutes,
	switchToMinuteOnHourSelect,
	closeOnMinuteSelect,
	hour24Mode,
	onDoneClick,
	doneButton,
}: Props) {
	return (
		<ConfigProvider
			coarseMinutes={coarseMinutes}
			forceCoarseMinutes={forceCoarseMinutes}
			switchToMinuteOnHourSelect={switchToMinuteOnHourSelect}
			closeOnMinuteSelect={closeOnMinuteSelect}
			hour24Mode={hour24Mode}
			onDoneClick={onDoneClick}
			doneButton={doneButton}
		>
			<StateProvider onChange={onChange} time={time}>
				<TimeKeeper />
			</StateProvider>
		</ConfigProvider>
	)
}
