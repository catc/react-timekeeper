import parse from '../parse-time';

describe('helpers/parse-time', () => {
	describe('pass string', () => {
		test('parses 12 hour format', () => {
			expect( parse('8:32 am') ).toMatchObject({
				hour: 8,
				hour24: 8,
				minute: 32,
				meridiem: 'am'
			})

			expect( parse('12:32 am') ).toMatchObject({
				hour: 12,
				hour24: 0,
				minute: 32,
				meridiem: 'am'
			})

			expect( parse('12:32 pm') ).toMatchObject({
				hour: 12,
				hour24: 12,
				minute: 32,
				meridiem: 'pm'
			})

			expect( parse('8:32am') ).toMatchObject({
				hour: 8,
				hour24: 8,
				minute: 32,
				meridiem: 'am'
			})

			expect( parse('12:32pm') ).toMatchObject({
				hour: 12,
				hour24: 12,
				minute: 32,
				meridiem: 'pm'
			})

			expect( parse('0:32pm') ).toMatchObject({
				hour: 12,
				hour24: 12,
				minute: 32,
				meridiem: 'pm'
			})
		})

		test('parses 24 hour format string', () => {
			expect( parse('8:32') ).toMatchObject({
				hour: 8,
				hour24: 8,
				minute: 32,
				meridiem: 'am'
			})

			expect( parse('18:30') ).toMatchObject({
				hour: 6,
				hour24: 18,
				minute: 30,
				meridiem: 'pm'
			})

			expect( parse('0:30') ).toMatchObject({
				hour: 12,
				hour24: 0,
				minute: 30,
				meridiem: 'am'
			})

			expect( parse('12:00') ).toMatchObject({
				hour: 12,
				hour24: 12,
				minute: 0,
				meridiem: 'pm'
			})

			expect( parse('24:30') ).toMatchObject({
				hour: 12,
				hour24: 0,
				minute: 30,
				meridiem: 'am'
			})
		})
		
		test('handles invalid time', () => {
			expect( () => parse('25:70 am') ).toThrow()
			expect( () => parse('13:10 am') ).toThrow()
			expect( () => parse('8:70 am') ).toThrow()
			expect( () => parse('8:20 zz') ).toThrow()
			expect( () => parse('25:50') ).toThrow()
			expect( () => parse('12:70') ).toThrow()
			expect( () => parse('25:70') ).toThrow()
			expect( () => parse('random string') ).toThrow()
		})
	})

	describe('pass object', () => {
		test('parses time object with no meridiem (24 hr format)', () => {
			expect( parse({
				hour: 6,
				minute: 32
			}) ).toMatchObject({
				hour: 6,
				hour24: 6,
				minute: 32,
				meridiem: 'am'
			})

			expect( parse({
				hour: 12,
				minute: 32
			}) ).toMatchObject({
				hour: 12,
				hour24: 12,
				minute: 32,
				meridiem: 'pm'
			})

			expect( parse({
				hour: 14,
				minute: 32
			}) ).toMatchObject({
				hour: 2,
				hour24: 14,
				minute: 32,
				meridiem: 'pm'
			})

			expect( parse({
				hour: 24,
				minute: 32
			}) ).toMatchObject({
				hour: 12,
				hour24: 0,
				minute: 32,
				meridiem: 'am'
			})
		})

		test('parses time object with a meridiem (12 hr)', () => {
			expect( parse({
				hour: 8,
				minute: 32,
				meridiem: 'am'
			}) ).toMatchObject({
				hour: 8,
				hour24: 8,
				minute: 32,
				meridiem: 'am'
			})

			expect( parse({
				hour: 2,
				minute: 32,
				meridiem: 'pm'
			}) ).toMatchObject({
				hour: 2,
				hour24: 14,
				minute: 32,
				meridiem: 'pm'
			})

			expect( parse({
				hour: 0,
				minute: 32,
				meridiem: 'am'
			}) ).toMatchObject({
				hour: 12,
				hour24: 0,
				minute: 32,
				meridiem: 'am'
			})
		})

		test('handles invalid time', () => {
			expect( () => parse({
				hour: 26,
				minute: 32
			}) ).toThrow()

			expect( () => parse({
				hour: 12,
				minute: 70
			}) ).toThrow()

			expect( () => parse({
				hour: 26,
				minute: 70
			}) ).toThrow()

			expect( () => parse({
				someKey: 26,
				anotherKey: 70
			}) ).toThrow()
		})

		test('handles empty time argument', () => {
			const defaultTime = {
				hour: 12,
				minute: 0,
				meridiem: 'pm'
			}

			expect( parse() ).toMatchObject(defaultTime)
			expect( parse(null) ).toMatchObject(defaultTime)
		})

	})

});
