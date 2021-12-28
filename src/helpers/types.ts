import { MutableRefObject } from 'react'

export type ElementRef = MutableRefObject<HTMLDivElement | null>

// assumes 24 hour time
export interface Time {
	hour: number
	minute: number
}

export interface Time24 {
	hour: number
	minute: number
}

export interface Time12 extends Time24 {
	meridiem: string
}

// time passed in from parent
export type TimeInput = string | Time24 | Time12 | undefined | null

// function passed in from parent
export type ChangeTimeFn = (t: TimeOutput) => void

// time passed to parent
export interface TimeOutput {
	formatted12: string
	formattedSimple: string
	formatted24: string
	hour: number
	hour12: number
	minute: number
	meridiem: string
	isValid: boolean
}
