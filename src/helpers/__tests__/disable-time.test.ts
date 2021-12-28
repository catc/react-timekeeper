import DisabledTimeRange from '../disable-time'

interface HourTestCase {
	name: string
	from: string
	to: string
	cases: [hour: number, expected: boolean][]
}

interface MinuteTestCase extends Omit<HourTestCase, 'cases'> {
	name: string
	from: string
	to: string
	cases: [hour: number, minute: number, expected: boolean][]
}

const hourTestCases: HourTestCase[] = [
	{
		name: 'basic time range',
		from: '6:00',
		to: '15:00',
		cases: [
			[0, true],
			[4, true],
			[6, true],
			[7, false],
			[14, false],
			[15, true],
			[16, true],
		],
	},
	{
		name: 'basic time range with minutes',
		from: '6:20',
		to: '15:35',
		cases: [
			[4, true],
			[6, true],
			[7, false],
			[14, false],
			[15, true],
			[16, true],
		],
	},
	{
		name: 'overnight time range',
		from: '15:00',
		to: '6:00',
		cases: [
			[4, false],
			[6, true],
			[7, true],
			[14, true],
			[15, true],
			[16, false],
		],
	},
	{
		name: 'overnight time range with minutes',
		from: '15:20',
		to: '6:35',
		cases: [
			[4, false],
			[6, true],
			[7, true],
			[14, true],
			[15, true],
			[16, false],
		],
	},
	{
		name: 'same hour, regular range',
		from: '6:20',
		to: '6:45',
		cases: [
			[2, true],
			[5, true],
			[6, true],
			[7, true],
			[10, true],
		],
	},
	{
		name: 'same hour, overnight',
		from: '6:45',
		to: '6:20',
		cases: [
			[2, false],
			[5, false],
			[6, true],
			[7, false],
			[10, false],
		],
	},
	{
		name: 'same hour, on the hour',
		from: '6:00',
		to: '6:20',
		cases: [
			[2, true],
			[5, true],
			[6, true],
			[7, true],
			[10, true],
		],
	},
	{
		name: 'midnight, regular range',
		from: '0:20',
		to: '6:20',
		cases: [
			[0, true],
			[1, false],
			[5, false],
			[6, true],
			[7, true],
			[10, true],
		],
	},
	{
		name: 'midnight, on the hour, regular range',
		from: '0:00',
		to: '6:20',
		cases: [
			[0, true],
			[1, false],
			[5, false],
			[6, true],
			[7, true],
			[10, true],
		],
	},
	{
		name: 'midnight, overnight',
		from: '20:00',
		to: '0:00',
		cases: [
			[0, true],
			[1, true],
			[19, true],
			[20, true],
			[24, false],
		],
	},
]

const MinuteTestCase: MinuteTestCase[] = [
	{
		name: 'basic time range, on the hour',
		from: '6:00',
		to: '15:00',
		cases: [
			[5, 59, true],
			[6, 0, true],
			[7, 5, false],
			[15, 0, true],
			[15, 5, true],
		],
	},
	{
		name: 'basic time range',
		from: '6:20',
		to: '15:35',
		cases: [
			[5, 59, true],
			[6, 19, true],
			[6, 20, true],
			[6, 21, false],
			[7, 5, false],
			[15, 0, false],
			[15, 5, false],
			[15, 34, false],
			[15, 35, true],
			[15, 36, true],
		],
	},
	{
		name: 'overnight time range',
		from: '15:35',
		to: '6:20',
		cases: [
			[14, 34, true],
			[15, 34, true],
			[15, 35, true],
			[15, 36, false],
			[16, 19, false],
			[5, 0, false],
			[6, 0, false],
			[6, 19, false],
			[6, 20, true],
			[6, 21, true],
		],
	},
]

describe('disabled time range - hours', () => {
	hourTestCases.forEach(({ name, from, to, cases }) => {
		describe(`${name}: ${from} -> ${to}`, () => {
			const dtr = new DisabledTimeRange(from, to)
			cases.forEach(([hour, expected]) => {
				it(`hour: ${hour} -> ${expected}`, () => {
					expect(dtr.validateHour(hour)).toEqual(expected)
				})
			})
		})
	})
})

describe('disabled time range - minutes', () => {
	MinuteTestCase.forEach(({ name, from, to, cases }) => {
		describe(`${name}: ${from} -> ${to}`, () => {
			const dtr = new DisabledTimeRange(from, to)
			cases.forEach(([hour, minute, expected]) => {
				it(`hour: ${hour}, minute: ${minute} -> ${expected}`, () => {
					expect(dtr.validateMinute(hour, minute)).toEqual(expected)
				})
			})
		})
	})
})
