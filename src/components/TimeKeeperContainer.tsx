import TimeKeeper from './TimeKeeper'
import { ConfigProvider, ConfigProps } from '../hooks/useConfigContext'
import { StateProvider } from '../hooks/useStateContext'
import { TimeInput, ChangeTimeFn } from '../helpers/types'

export interface Props extends ConfigProps {
	time?: TimeInput
	onChange?: ChangeTimeFn
	timeRange?: null | { from: string, to: string }
	disabledTimeRange?: null | { from: string; to: string }
}

export default function TimepickerWithConfig({
	time,
	onChange,
	// config props:
	coarseMinutes,
	forceCoarseMinutes,
	switchToMinuteOnHourSelect,
	switchToMinuteOnHourDropdownSelect,
	closeOnMinuteSelect,
	hour24Mode,
	onDoneClick,
	doneButton,
	timeRange,
	disabledTimeRange,
}: Props) {
	return (
		<ConfigProvider
			coarseMinutes={coarseMinutes}
			forceCoarseMinutes={forceCoarseMinutes}
			switchToMinuteOnHourSelect={switchToMinuteOnHourSelect}
			switchToMinuteOnHourDropdownSelect={switchToMinuteOnHourDropdownSelect}
			closeOnMinuteSelect={closeOnMinuteSelect}
			hour24Mode={hour24Mode}
			onDoneClick={onDoneClick}
			doneButton={doneButton}
		>
			<StateProvider
				onChange={onChange}
				time={time}
				timeRange={timeRange}
				disabledTimeRange={disabledTimeRange}
			>
				<TimeKeeper />
			</StateProvider>
		</ConfigProvider>
	)
}
