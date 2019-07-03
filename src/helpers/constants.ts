export const HOURS_12 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((a) => a.toString())
export const MINUTES = ['05', 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, '00'].map((a) => a.toString())

// radius of clock, in px
export const CLOCK_RADIUS = 110
const CLOCK_SIZE = CLOCK_RADIUS * 2

// clock hand length, in px
const CLOCK_HAND_LENGTH = 90

// number of actual numbers to display
const NUMBER_INCREMENTS = 12
export const NUMBER_INCREMENTS_VALUE = 360 / NUMBER_INCREMENTS

// size of circle surrounding number
export const NUMBER_SIZE = 34

// positioning of numbers within circle
export const NUMBER_INNER_POSITION = 22

// initial position of hours/minutes before animating to final position
export const INITIAL_HOUR_TRANSFORM = NUMBER_INNER_POSITION - 30
export const INITIAL_MINUTE_TRANSFORM = NUMBER_INNER_POSITION + 26
