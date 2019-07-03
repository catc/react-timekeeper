import { NUMBER_INCREMENTS_VALUE, CLOCK_RADIUS, NUMBER_SIZE } from './constants'

const { cos, sin, atan2 } = Math
const pi = Math.PI

function rad(deg: number): number {
	return deg / (180 / pi)
}
function deg(rad: number): number {
	return rad * (180 / pi)
}

// translate number position
function translateX(index: number, transform: number): number {
	return (
		sin(rad(index * -NUMBER_INCREMENTS_VALUE - 180)) * (CLOCK_RADIUS - transform) +
		CLOCK_RADIUS -
		NUMBER_SIZE / 2
	)
}

function translateY(index: number, transform: number): number {
	return (
		cos(rad(index * -NUMBER_INCREMENTS_VALUE - 180)) * (CLOCK_RADIUS - transform) +
		CLOCK_RADIUS -
		NUMBER_SIZE / 2
	)
}

// calculate number position for animation
export function transform(index: number, t: number): string {
	const x = translateX(index, t)
	const y = translateY(index, t)
	return `translate(${x}px, ${y}px)`
}
