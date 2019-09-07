import React from 'react'
import { mount, ReactWrapper } from 'enzyme'
import { act } from 'react-dom/test-utils'

import ClockWrapper from '../../ClockWrapper'
import TimeKeeperWrapper from '../../TimeKeeperWrapper'
import TopBar from '../../TopBar'

export const noop = () => {}

export function mockAnimations() {
	global.requestAnimationFrame = (fn) => setTimeout(fn, 1)
}

// unused by itself?
export function update() {
	act(() => {
		jest.runAllTimers()
	})
}

export function waitForUpdates(wrapper: ReactWrapper) {
	// mock timers so animations finish
	act(() => {
		jest.runAllTimers()
	})

	// update enzyme wrapper
	wrapper.update()
}

interface MouseEvent {
	clientX?: number
	clientY?: number
}

export function triggerMouseClick(wrapper: ReactWrapper, opts: MouseEvent = {}) {
	const cw = wrapper.find(ClockWrapper)

	// simulate mouseup and then moouse down with coordinates
	cw.simulate('mousedown', {})
	act(() => {
		const e = new MouseEvent('mouseup', opts)
		document.dispatchEvent(e)
	})

	waitForUpdates(wrapper)
}

export function renderTK(override: any = {}) {
	const onChange = jest.fn()
	const props: any = {
		time: { hour: 5, minute: 30 },
		onChange,
		...override,
	}
	const wrapper = mount(<TimeKeeperWrapper {...props} />)

	return {
		wrapper,
		onChange,
	}
}

export function changeToMinutes(wrapper: ReactWrapper) {
	const minute = wrapper.find(TopBar).find('span[data-type="minute"]')
	minute.simulate('click')

	waitForUpdates(wrapper)
}
