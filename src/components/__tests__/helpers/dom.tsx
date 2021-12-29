import { render, fireEvent, RenderResult, act } from '@testing-library/react'
import TimeKeeper, { Props as TimekeeperProps } from '../../TimeKeeperContainer'
import { Coords } from './coords'

export function mockAnimations() {
	global.requestAnimationFrame = fn => setTimeout(fn, 1)
}

export function renderTK(override: TimekeeperProps = {}) {
	const onChange = jest.fn()
	const props = {
		time: { hour: 5, minute: 30 },
		onChange,
		...override,
	}
	const wrapper = render(<TimeKeeper {...props} />)

	return {
		wrapper,
		onChange,
	}
}

export function changeToMinutes(wrapper: RenderResult) {
	fireEvent.click(wrapper.getByTestId('topbar_minute'))
	act(() => {
		jest.runAllTimers()
	})
}

export function changeMeridiem(wrapper: RenderResult, meridiem = 'pm') {
	fireEvent.click(
		wrapper.getByTestId(meridiem === 'pm' ? 'meridiem_pm' : 'meridiem_am'),
	)
}

export function clickOnPoint(wrapper: RenderResult, coords: Coords) {
	const { getByTestId } = wrapper
	const cw = getByTestId('clock-wrapper')

	// trigger mousedown and them up with coordinates
	fireEvent(
		cw,
		new MouseEvent('mousedown', {
			...coords,
			bubbles: true,
		}),
	)
	fireEvent(
		cw,
		new MouseEvent('mouseup', {
			...coords,
			bubbles: true,
		}),
	)

	act(() => {
		jest.runAllTimers()
	})
}
