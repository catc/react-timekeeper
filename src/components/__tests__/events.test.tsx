import { fireEvent } from '@testing-library/react'
import {
	renderTK,
	mockAnimations,
	clickOnPoint,
	changeToMinutes,
	changeMeridiem,
} from './helpers/dom'
import {
	HOUR_12_INNER,
	HOUR_24_OUTER,
	HOUR_3_OUTER,
	HOUR_3_INNER,
	Coords,
	MINUTE_7,
	MINUTE_23,
	MINUTE_59,
	MIDNIGHT_OUTER_FROM_LEFT,
	MIDNIGHT_OUTER_FROM_RIGHT,
	MIDNIGHT_INNER_FROM_LEFT,
	MIDNIGHT_INNER_FROM_RIGHT,
	generateCoords,
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
		function testHours(
			coords: Coords,
			expectedTime: string,
			opts: Partial<TimekeeperProps> = {},
		) {
			const { wrapper, onChange } = renderTK({
				time: { hour: 5, minute: 20 },
				...opts,
			})

			clickOnPoint(wrapper, coords)

			expect(onChange).toBeCalledTimes(2)
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
			testHours(HOUR_3_OUTER, '15:20', { hour24Mode: true })
		})
		it('handles inner click on "3" during 24h mode', () => {
			testHours(HOUR_3_INNER, '3:20', { hour24Mode: true })
		})
		it('handles outer click on "12" during 24h mode', () => {
			testHours(HOUR_24_OUTER, '0:20', { hour24Mode: true })
		})
		it('handles inner click on "12" during 24h mode', () => {
			testHours(HOUR_12_INNER, '12:20', { hour24Mode: true })
		})

		// test midnight/noon values from angles on left and right
		it('handles click on "12" from left during 12h mode', () => {
			testHours(MIDNIGHT_OUTER_FROM_LEFT, '0:20')
		})
		it('handles click on "12" from right during 12h mode', () => {
			testHours(MIDNIGHT_OUTER_FROM_RIGHT, '0:20')
		})
		it('handles outer click on "12" from left during 24h mode', () => {
			testHours(MIDNIGHT_OUTER_FROM_LEFT, '0:20', { hour24Mode: true })
		})
		it('handles outer click on "12" from right during 24h mode', () => {
			testHours(MIDNIGHT_OUTER_FROM_RIGHT, '0:20', { hour24Mode: true })
		})
		it('handles inner click on "12" from right during 24h mode', () => {
			testHours(MIDNIGHT_INNER_FROM_LEFT, '12:20', { hour24Mode: true })
		})
		it('handles inner click on "12" from right during 24h mode', () => {
			testHours(MIDNIGHT_INNER_FROM_RIGHT, '12:20', { hour24Mode: true })
		})

		// blocked off hours
		describe('blocked time range', () => {
			it('handles blocked off times during 12h mode', () => {
				const { wrapper, onChange } = renderTK({
					time: { hour: 5, minute: 20 },
					disabledTimeRange: { from: '6:20', to: '17:35' },
				})
				const { getByTestId } = wrapper

				// hours
				clickOnPoint(wrapper, generateCoords(8, 'hour'))
				expect(onChange).not.toBeCalled()

				clickOnPoint(wrapper, generateCoords(3, 'hour'))
				expect(onChange).toHaveBeenCalledWith(
					expect.objectContaining({
						formatted24: '3:20',
					}),
				)

				// test pm meridiem
				fireEvent.click(getByTestId('meridiem_pm'))
				onChange.mockClear()

				clickOnPoint(wrapper, generateCoords(3, 'hour'))
				expect(onChange).not.toBeCalled()

				clickOnPoint(wrapper, generateCoords(8, 'hour'))
				expect(onChange).toHaveBeenCalledWith(
					expect.objectContaining({
						formatted24: '20:20',
					}),
				)

				// minutes
				// select hour with disabled minutes
				clickOnPoint(wrapper, generateCoords(5, 'hour'))
				changeToMinutes(wrapper)

				onChange.mockClear()
				clickOnPoint(wrapper, generateCoords(15, 'minute'))
				expect(onChange).not.toBeCalled()
				clickOnPoint(wrapper, generateCoords(40, 'minute'))
				expect(onChange).toHaveBeenCalledWith(
					expect.objectContaining({
						formatted24: '17:40',
					}),
				)
			})

			it('handles blocked off times during 24h mode', () => {
				const { wrapper, onChange } = renderTK({
					time: { hour: 5, minute: 20 },
					hour24Mode: true,
					disabledTimeRange: { from: '6:20', to: '17:35' },
				})

				clickOnPoint(wrapper, generateCoords(8, 'hour'))
				expect(onChange).not.toBeCalled()
				clickOnPoint(wrapper, generateCoords(20, 'hour'))
				expect(onChange).toHaveBeenCalledWith(
					expect.objectContaining({
						formatted24: '20:20',
					}),
				)

				// test midnight
				onChange.mockClear()
				clickOnPoint(wrapper, generateCoords(12, 'hour'))
				expect(onChange).not.toBeCalled()
				clickOnPoint(wrapper, generateCoords(24, 'hour'))
				expect(onChange).toHaveBeenCalledWith(
					expect.objectContaining({
						formatted24: '0:20',
					}),
				)

				// test minutes
				// select hour with disabled minutes
				clickOnPoint(wrapper, generateCoords(6, 'hour'))
				changeToMinutes(wrapper)

				onChange.mockClear()
				clickOnPoint(wrapper, generateCoords(40, 'minute'))
				expect(onChange).not.toBeCalled()
				clickOnPoint(wrapper, generateCoords(10, 'minute'))
				expect(onChange).toHaveBeenCalledWith(
					expect.objectContaining({
						formatted24: '6:10',
					}),
				)
			})
		})

		// TimeOutput.isValid
		describe('supports TimeOutput.isValid', () => {
			it('handles isValid', () => {
				const { wrapper, onChange } = renderTK({
					time: { hour: 5, minute: 45 },
					disabledTimeRange: { from: '6:20', to: '17:35' },
				})
				const { getByTestId } = wrapper

				// 6:45 is invalid
				clickOnPoint(wrapper, generateCoords(6, 'hour'))
				expect(onChange).toHaveBeenCalledWith(
					expect.objectContaining({
						formatted24: '6:45',
						isValid: false,
					}),
				)

				// change minutes to something valid
				fireEvent.click(getByTestId('topbar_minute'))
				fireEvent.click(getByTestId('topbar_minute'))
				onChange.mockClear()
				clickOnPoint(wrapper, generateCoords(15, 'minute'))
				expect(onChange).toHaveBeenCalledWith(
					expect.objectContaining({
						formatted24: '6:15',
						isValid: true,
					}),
				)
			})
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

			expect(onChange).toBeCalledTimes(2)
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

		describe('supports blocked times', () => {
			function renderHourDropdown(opts: TimekeeperProps = {}) {
				const { wrapper, onChange } = renderTK(opts)
				const { getByTestId, getAllByTestId } = wrapper

				// open dropdown
				fireEvent.click(getByTestId('topbar_hour'))

				const numbers = getAllByTestId('time-dropdown_number')

				return { numbers, onChange, wrapper }
			}

			it('handles blocked off times during 12h mode', () => {
				const { onChange, numbers, wrapper } = renderHourDropdown({
					time: { hour: 5, minute: 20 },
					disabledTimeRange: { from: '6:20', to: '17:35' },
				})
				const { getByTestId, getAllByTestId } = wrapper

				fireEvent.click(numbers[6]) // click 7
				fireEvent.click(numbers[10]) // click 11
				expect(onChange).not.toBeCalled()

				// 12 should be clickable (since 12am is 0)
				fireEvent.click(numbers[11])
				expect(onChange).toBeCalledWith(
					expect.objectContaining({
						formatted24: '0:20',
					}),
				)

				// toggle pm
				changeMeridiem(wrapper)
				fireEvent.click(getByTestId('topbar_hour'))
				const numbersPM = getAllByTestId('time-dropdown_number')

				onChange.mockClear()
				fireEvent.click(numbersPM[0]) // click 1
				fireEvent.click(numbersPM[3]) // click 4
				fireEvent.click(numbersPM[11]) // click 12
				expect(onChange).not.toBeCalled()
				fireEvent.click(numbersPM[4]) // click 4
				expect(onChange).toBeCalledWith(
					expect.objectContaining({
						formatted24: '17:20',
					}),
				)

				// test minutes
				fireEvent.click(getByTestId('topbar_minute'))
				fireEvent.click(getByTestId('topbar_minute'))

				onChange.mockClear()
				const numbersMin = getAllByTestId('time-dropdown_number')
				fireEvent.click(numbersMin[0])
				fireEvent.click(numbersMin[34])
				expect(onChange).not.toBeCalled()
				fireEvent.click(numbersMin[35])
				expect(onChange).toBeCalledWith(
					expect.objectContaining({
						formatted24: '17:35',
					}),
				)
			})

			it('handles blocked off times during 24h mode', () => {
				const { onChange, numbers, wrapper } = renderHourDropdown({
					time: { hour: 5, minute: 20 },
					hour24Mode: true,
					disabledTimeRange: { from: '17:20', to: '6:35' },
				})
				const { getByTestId, getAllByTestId } = wrapper

				fireEvent.click(numbers[0]) // click 1
				fireEvent.click(numbers[4]) // click 5
				fireEvent.click(numbers[17]) // click 18
				fireEvent.click(numbers[23]) // click 24/00
				expect(onChange).not.toBeCalled()
				fireEvent.click(numbers[16])
				expect(onChange).toBeCalledWith(
					expect.objectContaining({
						formatted24: '17:20',
					}),
				)

				// test minutes
				fireEvent.click(getByTestId('topbar_minute'))
				fireEvent.click(getByTestId('topbar_minute'))

				onChange.mockClear()
				const numbersMin = getAllByTestId('time-dropdown_number')
				fireEvent.click(numbersMin[21])
				fireEvent.click(numbersMin[22])
				fireEvent.click(numbersMin[59])
				expect(onChange).not.toBeCalled()
				fireEvent.click(numbersMin[20])
				expect(onChange).toBeCalledWith(
					expect.objectContaining({
						formatted24: '17:20',
					}),
				)
			})
		})
	})
})
