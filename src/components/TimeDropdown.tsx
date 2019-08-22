import React, { useCallback, useEffect, useRef, MutableRefObject } from 'react'

import * as styles from './styles/time-dropdown'
import useConfig from '../hooks/config'
import { getScrollBarWidth } from '../helpers/dom'
import { getTimeValue } from '../helpers/utils'
import { ElementRef } from '../helpers/types'
import { CLOCK_VALUES, MODE } from '../helpers/constants'
import useTimekeeperState from '../hooks/state-context'

interface Props {
	close: () => void
}

let scrollbarWidth: null | number = null

type ElementLiRef = MutableRefObject<HTMLLIElement | null>

export default function TimeDropdown({ close }: Props) {
	const { hour24Mode } = useConfig()
	const { updateTime, mode, time } = useTimekeeperState()

	const container: ElementRef = useRef(null)
	const selectedOption: ElementLiRef = useRef(null)

	const options = CLOCK_VALUES[mode].dropdown
	const selected = getTimeValue(mode, time).toString()

	function disableBodyScroll() {
		document.documentElement.style.paddingRight = scrollbarWidth + 'px'
		document.documentElement.classList.add('react-timekeeper-noscroll')
	}
	function enableBodyScroll() {
		document.documentElement.style.paddingRight = 0
		document.documentElement.classList.remove('react-timekeeper-noscroll')
	}

	const elsewhereClick = useCallback(
		(e: MouseEvent) => {
			const parent = container.current
			const child = e.target
			let node = child.parentNode
			while (node != null) {
				if (node === parent) {
					return
				}
				node = node.parentNode
			}
			close()
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
	function select(val: string) {
		let parsed = parseInt(val, 10)
		if (mode === MODE.HOURS_12 && parsed === 12) {
			parsed = 0
		}
		updateTime(parsed)
		close()
	}

	return (
		<div
			css={styles.wrapper(hour24Mode, mode)}
			ref={container}
			onMouseEnter={disableBodyScroll}
			onMouseLeave={enableBodyScroll}
			className="react-timekeeper__time-dropdown"
		>
			<ul css={styles.options} className="react-timekeeper__dropdown-numbers">
				{options.map((o) => (
					<li
						ref={(el) => (selected === o ? (selectedOption.current = el) : '')}
						css={styles.option(selected === o)}
						key={o}
						onClick={() => select(o)}
					>
						{o}
					</li>
				))}
			</ul>
		</div>
	)
}
