import { composeTime as compose } from '../time'

describe('helpers/compose-time', () => {
	test('formatted24', () => {
		expect(
			compose(
				0,
				30,
			),
		).toMatchObject({
			formatted24: '0:30',
			formatted12: '12:30 am',
			formattedSimple: '12:30',
			hour: 0,
			hour12: 12,
			minute: 30,
			meridiem: 'am',
		})

		expect(
			compose(
				1,
				30,
			),
		).toMatchObject({
			formatted24: '1:30',
			formatted12: '1:30 am',
			formattedSimple: '1:30',
			hour: 1,
			hour12: 1,
			minute: 30,
			meridiem: 'am',
		})

		expect(
			compose(
				12,
				30,
			),
		).toMatchObject({
			formatted24: '12:30',
			formatted12: '12:30 pm',
			formattedSimple: '12:30',
			hour: 12,
			hour12: 12,
			minute: 30,
			meridiem: 'pm',
		})

		expect(
			compose(
				13,
				30,
			),
		).toMatchObject({
			formatted24: '13:30',
			formatted12: '1:30 pm',
			formattedSimple: '1:30',
			hour: 13,
			hour12: 1,
			minute: 30,
			meridiem: 'pm',
		})

		// test for correct minute padding
		expect(
			compose(
				1,
				5,
			),
		).toHaveProperty('formatted24', '1:05')
		expect(
			compose(
				1,
				0,
			),
		).toHaveProperty('formatted24', '1:00')
	})
})
