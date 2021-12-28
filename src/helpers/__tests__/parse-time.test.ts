import { parseTime as parse } from '../time'

describe('helpers/parse-time', () => {
	describe('pass string', () => {
		test('parses 12 hour format', () => {
			expect(parse('8:32 am')).toMatchObject({
				hour: 8,
				minute: 32,
			})

			expect(parse('12:32 am')).toMatchObject({
				hour: 0,
				minute: 32,
			})

			expect(parse('12:32 pm')).toMatchObject({
				hour: 12,
				minute: 32,
			})

			expect(parse('8:32am')).toMatchObject({
				hour: 8,
				minute: 32,
			})

			expect(parse('12:32pm')).toMatchObject({
				hour: 12,
				minute: 32,
			})

			expect(parse('0:32pm')).toMatchObject({
				hour: 12,
				minute: 32,
			})

			expect(parse('3:32pm')).toMatchObject({
				hour: 15,
				minute: 32,
			})
		})

		test('parses 24 hour format string', () => {
			expect(parse('8:32')).toMatchObject({
				hour: 8,
				minute: 32,
			})

			expect(parse('18:30')).toMatchObject({
				hour: 18,
				minute: 30,
			})

			expect(parse('0:30')).toMatchObject({
				hour: 0,
				minute: 30,
			})

			expect(parse('12:00')).toMatchObject({
				hour: 12,
				minute: 0,
			})

			expect(parse('24:30')).toMatchObject({
				hour: 0,
				minute: 30,
			})
		})

		test('handles invalid time', () => {
			expect(() => parse('25:70 am')).toThrow()
			expect(() => parse('13:10 am')).toThrow()
			expect(() => parse('8:70 am')).toThrow()
			expect(() => parse('8:20 zz')).toThrow()
			expect(() => parse('25:50')).toThrow()
			expect(() => parse('12:70')).toThrow()
			expect(() => parse('25:70')).toThrow()
			expect(() => parse('random string')).toThrow()
		})
	})

	describe('pass object', () => {
		test('parses time object with no meridiem (24 hr format)', () => {
			expect(
				parse({
					hour: 6,
					minute: 32,
				}),
			).toMatchObject({
				hour: 6,
				minute: 32,
			})

			expect(
				parse({
					hour: 12,
					minute: 32,
				}),
			).toMatchObject({
				hour: 12,
				minute: 32,
			})

			expect(
				parse({
					hour: 14,
					minute: 32,
				}),
			).toMatchObject({
				hour: 14,
				minute: 32,
			})

			expect(
				parse({
					hour: 24,
					minute: 32,
				}),
			).toMatchObject({
				hour: 0,
				minute: 32,
			})
		})

		test('parses time object with a meridiem (12 hr)', () => {
			expect(
				parse({
					hour: 8,
					minute: 32,
					meridiem: 'am',
				}),
			).toMatchObject({
				hour: 8,
				minute: 32,
			})

			expect(
				parse({
					hour: 2,
					minute: 32,
					meridiem: 'pm',
				}),
			).toMatchObject({
				hour: 14,
				minute: 32,
			})

			expect(
				parse({
					hour: 0,
					minute: 32,
					meridiem: 'am',
				}),
			).toMatchObject({
				hour: 0,
				minute: 32,
			})
		})

		test('handles invalid time', () => {
			expect(() =>
				parse({
					hour: 26,
					minute: 32,
				}),
			).toThrow()

			expect(() =>
				parse({
					hour: 12,
					minute: 70,
				}),
			).toThrow()

			expect(() =>
				parse({
					hour: 26,
					minute: 70,
				}),
			).toThrow()

			expect(() =>
				parse({
					// @ts-expect-error
					someKey: 26,
					anotherKey: 70,
				}),
			).toThrow()
		})

		test('handles empty time argument', () => {
			const defaultTime = {
				hour: 12,
				minute: 30,
			}

			expect(parse()).toMatchObject(defaultTime)
			expect(parse(null)).toMatchObject(defaultTime)
		})
	})
})
