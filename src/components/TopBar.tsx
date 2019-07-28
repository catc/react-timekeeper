import React, { useState } from 'react'
import { jsx } from '@emotion/core'

import TimeDropdown from './TimeDropdown'
import useTimekeeperState from '../hooks/state-context'
import useConfig from '../hooks/config'
import * as styles from './styles/top-bar'
import { MODE, MERIDIEM } from '../helpers/constants'
import { isHourMode } from '../helpers/utils'

export default function TopBar() {
	const { hour24Mode } = useConfig()
	const { mode, time, updateMeridiem, setMode } = useTimekeeperState()
	const [open, setOpen] = useState<null | 'hour' | 'minute'>(null)

	// time clicks
	function timeClick(type: 'minute' | 'hour') {
		const current = mode === MODE.MINUTES ? 'minute' : 'hour'
		if (type === current) {
			setOpen(current)
		} else {
			const m = mode === MODE.MINUTES ? MODE.HOURS_24 : MODE.MINUTES
			setMode(m)
		}
	}

	// double ternary nastiness
	const hour = hour24Mode ? time.hour : time.hour % 12 === 0 ? 12 : time.hour % 12

	// meridiem
	const meridiem = time.hour >= 12 ? MERIDIEM.pm : MERIDIEM.am
	function toggleMeridiem() {
		const m = meridiem === MERIDIEM.am ? MERIDIEM.pm : MERIDIEM.am
		updateMeridiem(m)
	}

	const isHour = isHourMode(mode)
	const formattedMinute = ('0' + time.minute).slice(-2)

	const closeDropdown = () => setOpen(null)

	return (
		// TODO - see if can clean up number of divs
		<div css={styles.wrapper}>
			<div css={styles.timeWrapper}>
				<div css={styles.hourWrapper}>
					<span css={[styles.time(isHour)]} onClick={() => timeClick('hour')}>
						{hour}
					</span>

					{open === 'hour' && <TimeDropdown close={closeDropdown} />}
				</div>

				<span css={styles.colon}>:</span>

				<div css={styles.minuteWrapper}>
					<span css={styles.time(!isHour)} onClick={() => timeClick('minute')}>
						{formattedMinute}
					</span>

					{open === 'minute' && <TimeDropdown close={closeDropdown} />}
				</div>

				{!hour24Mode && (
					<button
						type="button"
						onClick={toggleMeridiem}
						css={styles.meridiem}
						className="react-timekeeper-button-reset react-timekeeper__meridiem-toggle"
					>
						{meridiem}
					</button>
				)}
			</div>
		</div>
	)
}
