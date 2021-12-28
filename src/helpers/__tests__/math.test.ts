import { calcAnimationAngle } from '../math'

type TestCase = [number, number, number]

describe('math/calcAnimationAngle', () => {
	function run(tc: TestCase) {
		const [prev, next, expected] = tc

		test(`${prev} -> ${next} = ${expected}`, () => {
			const fin = calcAnimationAngle(prev, next)

			// sanity check - double check the test case is actually correct
			const diff = Math.abs(prev - expected)
			expect(diff).toBeLessThanOrEqual(180)

			expect(fin).toEqual(expected)
		})
	}

	const tests: TestCase[] = [
		[30, 330, -30],
		[330, 240, 240],
		[330, 90, 360 + 90],
		[240, 340, 340],
		[90, 150, 150],
		[0, 150, 150],
		[330, 120, 360 + 120],
		[390, 60, 360 + 60],
		[390, 240, 240],
		[60, -60, -60],
		[-60, 60, 60],
		[-60, 240, -120],
		[240, 50, 360 + 50],
		[240, 330, 330],
		[240, 330, 330],
		[-120, 330, -30],
		[-390, 30, -330],
		[0, 0, 0],
		[0, 360, 0],
		[360, 360, 360],
	]
	tests.forEach(tc => run(tc))
})
