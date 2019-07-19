// import React from 'react'

import { HourNumbers, MinuteNumbers } from '../Numbers'
import Meridiems from '../Meridiems'

import './setup'
import { renderTK } from './utils'

/*
	TODO
	- add test for displaying done button if done function is provided
	- add test for displaying top bar
*/

describe('it renders correctly', () => {
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

	test.skip('TODO - add minutes test after adding top bar', () => {
		const { wrapper } = renderTK()

		const hours = wrapper.find(MinuteNumbers).find('span')
		expect(hours.length).toEqual(12)
	})

	test('displays meridiem selectors on 12h mode', () => {
		const { wrapper } = renderTK()

		const meridiems = wrapper.find(Meridiems)
		expect(meridiems.length).toEqual(1)
	})
})
