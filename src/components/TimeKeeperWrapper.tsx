import React from 'react'
import TimeKeeper, { Props as TimeKeeperProps } from './TimeKeeper'
import { ConfigProvider, Styles } from '../hooks/config'

interface Props extends TimeKeeperProps {
	styles?: Styles
}

export default function TimepickerWithConfig({
	onChange = () => {},
	useCoarseMinutes = false,
	styles = {},
}: Props) {
	return (
		<ConfigProvider styles={styles}>
			<TimeKeeper onChange={onChange} useCoarseMinutes={useCoarseMinutes} />
		</ConfigProvider>
	)
}
