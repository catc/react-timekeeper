import compose from '../compose-time';

describe('helpers/compose-time', () => {
	test('formatted24', () => {
		expect( compose(1, 30, 'am') ).toHaveProperty('formatted24', '1:30')
		expect( compose(1, 30, 'pm') ).toHaveProperty('formatted24', '13:30')
		expect( compose(12, 30, 'am') ).toHaveProperty('formatted24', '0:30')
	})
});
