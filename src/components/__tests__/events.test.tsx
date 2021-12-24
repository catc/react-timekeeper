import { fireEvent, RenderResult, act, getAllByTestId } from '@testing-library/react'
import { renderTK, mockAnimations, clickOnPoint, changeToMinutes } from './helpers/dom'
import {
	HOUR_12_INNER,
	HOUR_24_OUTER,
	HOUR_3_OUTER,
	HOUR_3_INNER,
	Coords,
	MINUTE_7,
	MINUTE_23,
	MINUTE_59,
} from './helpers/coords'
import { Props as TimekeeperProps } from '../TimeKeeperContainer'

jest.mock('lodash.debounce', () => ({
	__esModule: true,
	default: (fn: any) => fn,
}))

describe('handles events correctly', () => {
	beforeEach(() => {
		mockAnimations()
		jest.useFakeTimers()
	})

	describe('updates hours', () => {
		function testHours(coords: Coords, expectedTime: string, is24hrMode = false) {
			const { wrapper, onChange } = renderTK({
				time: { hour: 5, minute: 20 },
				hour24Mode: is24hrMode,
			})

			clickOnPoint(wrapper, coords)

			expect(onChange).toBeCalledTimes(1)
			expect(onChange).toBeCalledWith(
				expect.objectContaining({
					formatted24: expectedTime,
				}),
			)
		}

		it('handles outer click on "3" during 12h mode', () => {
			testHours(HOUR_3_OUTER, '3:20')
		})

		it('handles inner click on "3" during 12h mode', () => {
			testHours(HOUR_3_INNER, '3:20')
		})

		it('handles outer click on "12" during 12h mode', () => {
			testHours(HOUR_24_OUTER, '0:20')
		})

		it('handles inner click on "12" during 12h mode', () => {
			testHours(HOUR_12_INNER, '0:20')
		})

		it('handles outer click on "3" during 24h mode', () => {
			testHours(HOUR_3_OUTER, '15:20', true)
		})
		it('handles inner click on "3" during 24h mode', () => {
			testHours(HOUR_3_INNER, '3:20', true)
		})
		it('handles outer click on "12" during 24h mode', () => {
			testHours(HOUR_24_OUTER, '0:20', true)
		})
		it('handles inner click on "12" during 24h mode', () => {
			testHours(HOUR_12_INNER, '12:20', true)
		})
	})

	describe('updates minutes', () => {
		function testMinutes(
			coords: Coords,
			expectedTime: string,
			opts: TimekeeperProps = {},
		) {
			const { wrapper, onChange } = renderTK({
				time: { hour: 5, minute: 40 },
				...opts,
			})

			changeToMinutes(wrapper)

			clickOnPoint(wrapper, coords)

			expect(onChange).toBeCalledTimes(1)
			expect(onChange).toBeCalledWith(
				expect.objectContaining({
					formatted24: expectedTime,
				}),
			)
		}

		it('handles click on "15"', () => {
			testMinutes(HOUR_3_OUTER, '5:15')
		})
		it('handles click on "15"', () => {
			testMinutes(HOUR_12_INNER, '5:00')
		})
		it('handles coarse minutes', () => {
			// 7 rounded down to 5
			testMinutes(MINUTE_7, '5:05')
		})
		it('handles custom coarse minutes', () => {
			testMinutes(MINUTE_23, '12:30', {
				// set diff time from 30 so update goes through
				// since 23 min is rounded to 30 min
				time: '12:35',
				coarseMinutes: 15,
			})
		})
		it('handles coarse click on "59"', () => {
			testMinutes(MINUTE_59, '5:00')
		})
	})

	it('it changes from hours -> minutes on minute select', () => {
		const { wrapper } = renderTK({ switchToMinuteOnHourSelect: true })
		const { getAllByTestId } = wrapper

		clickOnPoint(wrapper, HOUR_3_OUTER)
		expect(getAllByTestId('number_minute')).toHaveLength(12)
	})

	it('handles meridiem clicks correctly', () => {
		const { onChange, wrapper } = renderTK({ time: { hour: 2, minute: 0 } })
		const { getByTestId } = wrapper
		fireEvent.click(getByTestId('meridiem_pm'))

		expect(onChange).toBeCalledTimes(1)
		expect(onChange).toBeCalledWith(
			expect.objectContaining({
				hour: 14,
			}),
		)
	})

	describe('top bar', () => {
		function renderHourDropdown(index: number, opts: TimekeeperProps = {}) {
			const { wrapper, onChange } = renderTK(opts)
			const { getByTestId, getAllByTestId } = wrapper

			// open dropdown
			fireEvent.click(getByTestId('topbar_hour'))

			const numbers = getAllByTestId('time-dropdown_number')
			fireEvent.click(numbers[index])

			expect(onChange).toBeCalledTimes(1)
			return onChange
		}

		it('handles hour updates during 12h mode', () => {
			const onChange = renderHourDropdown(6)

			expect(onChange).toBeCalledWith(
				expect.objectContaining({
					hour: 7,
				}),
			)
		})
		it('handles click on "6" during 24h mode', () => {
			const onChange = renderHourDropdown(6, { hour24Mode: true })

			expect(onChange).toBeCalledWith(
				expect.objectContaining({
					hour: 7,
				}),
			)
		})
		it('handles click on "12" during 24h mode', () => {
			const onChange = renderHourDropdown(11, { hour24Mode: true })

			expect(onChange).toBeCalledWith(
				expect.objectContaining({
					hour: 12,
				}),
			)
		})
		it('handles click on "24" during 24h mode', () => {
			const onChange = renderHourDropdown(23, { hour24Mode: true })

			expect(onChange).toBeCalledWith(
				expect.objectContaining({
					hour: 0,
				}),
			)
		})

		it('handles minute updates correctly', () => {
			const { wrapper, onChange } = renderTK()
			const { getByTestId, getAllByTestId } = wrapper

			// switch to minutes and open minutes
			fireEvent.click(getByTestId('topbar_minute'))
			fireEvent.click(getByTestId('topbar_minute'))

			const numbers = getAllByTestId('time-dropdown_number')
			fireEvent.click(numbers[32])

			expect(onChange).toBeCalledTimes(1)
			expect(onChange).toBeCalledWith(
				expect.objectContaining({
					minute: 32,
				}),
			)
		})
	})
})
