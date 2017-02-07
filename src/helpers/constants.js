
const hours = Array.apply(null, {length: 12}).map((a, i) => (i + 1).toString())
const minutes = Array.apply(null, {length: 60}).map((a, i) => i.toString())
export const CLOCK_DATA = {
	hour: {
		numbers: hours,
		dropdownOptions: hours,
		increments: 12
	},
	minute: {
		numbers: ['05', 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, '00'].map(a => a.toString()),
		dropdownOptions: minutes,
		increments: 60
	}
}