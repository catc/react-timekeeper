import React from 'react'

import { HourNumbers, MinuteNumbers } from '../Numbers'
import Meridiems from '../Meridiems'
import TopBar from '../TopBar'
import DoneButton from '../DoneButton'
import TimeDropdown from '../TimeDropdown'

import './setup'
import { renderTK, changeToMinutes, mockAnimations } from './utils'

describe('it renders correctly', () => {
	beforeEach(() => {
		mockAnimations()
		jest.useFakeTimers()
	})

	test('has 12 hour numbers on 12h mode', () => {
		const { wrapper } = renderTK()

		const hours = wrapper.find(HourNumbers).find('span')
		expect(hours.length).toEqual(12)
	})

	test('has 24 hour numbers on 24h mode', () => {
		const { wrapper } = renderTK({ hour24Mode: true })

		const hours = wrapper.find(HourNumbers).find('span')
		expect(hours.length).toEqual(24)
	})

	test('has 12 minute numbers', () => {
		const { wrapper } = renderTK()
		changeToMinutes(wrapper)

		const minutes = wrapper.find(MinuteNumbers).find('span')
		expect(minutes.length).toEqual(12)
	})

	test('displays meridiem selectors on 12h mode', () => {
		const { wrapper } = renderTK()

		const meridiems = wrapper.find(Meridiems)
		expect(meridiems).toExist()
	})

	test('displays no meridiem selectors on 24h mode', () => {
		const { wrapper } = renderTK({ hour24Mode: true })

		const meridiems = wrapper.find(Meridiems)
		expect(meridiems).not.toExist()
	})

	describe('top bar', () => {
		test('displays top bar', () => {
			const { wrapper } = renderTK()

			const topbar = wrapper.find(TopBar)
			expect(topbar).toExist()
		})

		test('displays meridiem button if 12h mode', () => {
			const { wrapper } = renderTK()

			const topbar = wrapper.find(TopBar)
			const meridiem = topbar.find('button[name="meridiem"]')
			expect(meridiem).toExist()
		})

		test('displays no meridiem button if 24h mode', () => {
			const { wrapper } = renderTK({ hour24Mode: true })

			const topbar = wrapper.find(TopBar)
			const meridiem = topbar.find('button[name="meridiem"]')
			expect(meridiem).not.toExist()
		})

		test('hour dropdown renders correctly for 12h', () => {
			const { wrapper } = renderTK()

			const topbar = wrapper.find(TopBar)
			const hour = topbar.find('span[data-type="hour"]')
			hour.simulate('click')

			const dropdown = wrapper.find(TimeDropdown)
			expect(dropdown).toExist()

			// is 12h so expect 12 numbers
			const numbers = dropdown.find('li')
			expect(numbers).toHaveLength(12)

			// click on a number
			expect(wrapper.find(TimeDropdown))
			numbers.at(1).simulate('click')

			// should be closed
			expect(wrapper.find(TimeDropdown)).not.toExist()
		})

		test('hour dropdown renders correctly for 24h', () => {
			const { wrapper } = renderTK({ hour24Mode: true })

			const topbar = wrapper.find(TopBar)
			const hour = topbar.find('span[data-type="hour"]')
			hour.simulate('click')

			const dropdown = wrapper.find(TimeDropdown)
			expect(dropdown).toExist()

			// is 24h so expect 24 numbers
			const numbers = dropdown.find('li')
			expect(numbers).toHaveLength(24)

			// click on a number
			expect(wrapper.find(TimeDropdown))
			numbers.at(1).simulate('click')

			// should be closed
			expect(wrapper.find(TimeDropdown)).not.toExist()
		})

		test('minute dropdown renders correctly for 24h', () => {
			const { wrapper } = renderTK({ hour24Mode: true })

			const topbar = wrapper.find(TopBar)
			const minute = topbar.find('span[data-type="minute"]')
			minute.simulate('click')
			minute.simulate('click')

			const dropdown = wrapper.find(TimeDropdown)
			expect(dropdown).toExist()

			// is 60m so expect 60 numbers
			const numbers = dropdown.find('li')
			expect(numbers).toHaveLength(60)

			// click on a number
			expect(wrapper.find(TimeDropdown))
			numbers.at(1).simulate('click')

			// should be closed
			expect(wrapper.find(TimeDropdown)).not.toExist()
		})
	})

	describe('done button', () => {
		test(`doesn't display any content if no done fn provided`, () => {
			const { wrapper } = renderTK()

			const done = wrapper.find(DoneButton)
			expect(done.html()).toBeNull()
		})

		test('displays button if done fn provided', () => {
			const fn = jest.fn()
			const time = { hour: 12, minute: 30}
			const { wrapper } = renderTK({ onDoneClick: fn, time })

			const done = wrapper.find(DoneButton)
			expect(done.text()).toMatch(/done/i)

			// test click
			done.find('span').simulate('click')
			expect(fn).toHaveBeenCalled()
			expect(fn).toBeCalledWith(
				expect.objectContaining({
					hour: time.hour,
					minute: time.minute
				}),
			)
		})

		test('displays content if done render props fn provided', () => {
			const buttonContent = <div>click me</div>
			const doneButton = () => buttonContent

			const { wrapper } = renderTK({ doneButton: doneButton })

			const done = wrapper.find(DoneButton)
			expect(done.contains(buttonContent)).toEqual(true)
		})
	})
})
