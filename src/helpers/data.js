
const hours = Array.apply(null, {length: 12}).map((a, i) => (i + 1).toString())
const hours24 = Array.apply(null, {length: 24}).map((a, i) => (i < 23 ? i + 1 : 0).toString())
const minutes = Array.apply(null, {length: 60}).map((a, i) => i.toString())
export const CLOCK_DATA = {
	hour: {
		numbers: hours,
		dropdownOptions: hours,
		increments: 12,
		coarseMultiplier: 1
	},
	hour24: {
		numbers: hours24,
		dropdownOptions: hours24,
		increments: 24,
		coarseMultiplier: 1
	},
	minute: {
		numbers: ['05', 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, '00'].map(a => a.toString()),
		dropdownOptions: minutes,
		increments: 60,
		coarseMultiplier: 5
	}
}