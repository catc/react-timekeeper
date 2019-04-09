import {composeTime as compose, composeTime24 as compose24} from '../compose-time';

describe('helpers/compose-time', () => {
	test('formatted24', () => {
		expect( compose(1, 30, 'am') ).toHaveProperty('formatted24', '1:30')
		expect( compose(1, 30, 'pm') ).toHaveProperty('formatted24', '13:30')
		expect( compose(12, 30, 'am') ).toHaveProperty('formatted24', '0:30')
		expect( compose(12, 30, 'pm') ).toHaveProperty('formatted24', '12:30')
	})
	test('hour24', () => {
		expect( compose(1, 30, 'am') ).toHaveProperty('hour24', 1)
		expect( compose(1, 30, 'pm') ).toHaveProperty('hour24', 13)
		expect( compose(12, 30, 'am') ).toHaveProperty('hour24', 0)
		expect( compose(12, 30, 'pm') ).toHaveProperty('hour24', 12)
		expect( compose24(1, 30) ).toHaveProperty('hour24', 1)
		expect( compose24(13, 30) ).toHaveProperty('hour24', 13)
		expect( compose24(24, 30) ).toHaveProperty('hour24', 0)
		expect( compose24(0, 30) ).toHaveProperty('hour24', 0)
		expect( compose24(12, 30) ).toHaveProperty('hour24', 12)
	})
});
