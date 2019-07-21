import React from 'react'
import TimeKeeper, { Props as TimeKeeperProps } from './TimeKeeper'
import { ConfigProvider, ConfigProps } from '../hooks/config'
import { StateProvider } from '../hooks/state-context'

interface Props extends TimeKeeperProps, ConfigProps {}

export default function TimepickerWithConfig({
	time,
	onChange,
	// config props:
	coarseMinutes,
	styles = {},
	switchToMinuteOnHourSelect,
	closeOnMinuteSelect,
	onDoneClick,
	hour24Mode,
}: Props) {
	return (
		<ConfigProvider
			styles={styles}
			coarseMinutes={coarseMinutes}
			switchToMinuteOnHourSelect={switchToMinuteOnHourSelect}
			closeOnMinuteSelect={closeOnMinuteSelect}
			onDoneClick={onDoneClick}
			hour24Mode={hour24Mode}
		>
			<StateProvider onChange={onChange} time={time}>
				<TimeKeeper onChange={onChange} time={time} />
			</StateProvider>
		</ConfigProvider>
	)
}
