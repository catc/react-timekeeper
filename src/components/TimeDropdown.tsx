import { useCallback, useEffect, useRef, MutableRefObject, useMemo } from 'react'

import * as styles from './styles/time-dropdown'
import useConfig from '../hooks/useConfigContext'
import { getScrollBarWidth } from '../helpers/dom'
import { getNormalizedTimeValue } from '../helpers/utils'
import { ElementRef } from '../helpers/types'
import { CLOCK_VALUES, MODE } from '../helpers/constants'
import useTimekeeperState from '../hooks/useStateContext'

interface Props {
	close: () => void
}

let scrollbarWidth: null | number = null

type ElementLiRef = MutableRefObject<HTMLLIElement | null>

export default function TimeDropdown({ close }: Props) {
	const { hour24Mode } = useConfig()
	const { updateTimeValue, mode, time, meridiem, disabledTimeRangeValidator } =
		useTimekeeperState()

	const container: ElementRef = useRef(null)
	const selectedOption: ElementLiRef = useRef(null)

	const options = useMemo(() => {
		const o = CLOCK_VALUES[mode].dropdown

		let validator: (value: string, i: number) => boolean = () => true
		if (disabledTimeRangeValidator) {
			if (mode === MODE.HOURS_12) {
				if (meridiem === 'am') {
					validator = (_, i) =>
						disabledTimeRangeValidator.validateHour((i + 1) % 12)
				} else {
					validator = (_, i) => {
						// account for last number (12) which should be first (noon, 1pm, ...) in 24h format
						const num = i === 11 ? 12 : i + 13
						return disabledTimeRangeValidator.validateHour(num)
					}
				}
			} else if (mode === MODE.HOURS_24) {
				validator = (_, i) =>
					disabledTimeRangeValidator.validateHour((i + 1) % 24)
			} else if (mode === MODE.MINUTES) {
				validator = v =>
					disabledTimeRangeValidator.validateMinute(time.hour, parseInt(v, 10))
			}
		}
		return o.map((value, i) => ({
			value,
			enabled: validator(value, i),
		}))
	}, [mode, disabledTimeRangeValidator, meridiem, time.hour])

	const selected = getNormalizedTimeValue(mode, time).toString()

	function disableBodyScroll() {
		document.documentElement.style.paddingRight = scrollbarWidth + 'px'
		document.documentElement.classList.add('react-timekeeper-noscroll')
	}
	function enableBodyScroll() {
		document.documentElement.style.paddingRight = '0'
		document.documentElement.classList.remove('react-timekeeper-noscroll')
	}

	const elsewhereClick = useCallback(
		(e: MouseEvent) => {
			if (!container.current || !e.target) {
				return
			}
			if (!container.current.contains(e.target as Node)) {
				close()
			}
		},
		[close],
	)

	useEffect(() => {
		// measure scroll bar width for first time
		if (scrollbarWidth == null) {
			scrollbarWidth = getScrollBarWidth()
		}

		// initial scroll in list
		if (selectedOption.current && container.current) {
			container.current.scrollTop = selectedOption.current.offsetTop
		}

		// listener to close if click outside dropdown
		document.addEventListener('click', elsewhereClick, false)

		return () => {
			document.removeEventListener('click', elsewhereClick, false)
			enableBodyScroll()
		}
	}, [elsewhereClick])

	// select a value
	function select(val: string, enabled: boolean) {
		if (!enabled) return

		let parsed = parseInt(val, 10)
		if (mode === MODE.HOURS_12 && parsed === 12) {
			parsed = 0
		}
		updateTimeValue(parsed, { type: 'dropdown' })
		close()
	}

	return (
		<div
			css={styles.wrapper(hour24Mode, mode)}
			ref={container}
			onMouseEnter={disableBodyScroll}
			onMouseLeave={enableBodyScroll}
			className="react-timekeeper__time-dropdown"
			data-testid="time-dropdown"
		>
			<ul css={styles.options} className="react-timekeeper__dropdown-numbers">
				{options.map(({ value, enabled }) => {
					const isSelected = selected === value
					return (
						<li
							ref={el => (isSelected ? (selectedOption.current = el) : '')}
							className={`react-timekeeper__dropdown-number ${
								isSelected
									? 'react-timekeeper__dropdown-number--active'
									: ''
							}`}
							css={styles.option({ active: isSelected, enabled })}
							key={value}
							onClick={() => select(value, enabled)}
							data-testid="time-dropdown_number"
						>
							{value}
						</li>
					)
				})}
			</ul>
		</div>
	)
}
