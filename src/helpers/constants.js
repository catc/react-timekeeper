
const hours = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(a => a.toString())
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