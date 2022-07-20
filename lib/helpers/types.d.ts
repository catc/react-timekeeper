import { MutableRefObject } from 'react';
export declare type ElementRef = MutableRefObject<HTMLDivElement | null>;
export interface Time {
    hour: number;
    minute: number;
}
export interface Time24 {
    hour: number;
    minute: number;
}
export interface Time12 extends Time24 {
    meridiem: string;
}
export declare type TimeInput = string | Time24 | Time12 | undefined | null;
export declare type ChangeTimeFn = (t: TimeOutput) => void;
export interface TimeOutput {
    formatted12: string;
    formattedSimple: string;
    formatted24: string;
    hour: number;
    hour12: number;
    minute: number;
    meridiem: string;
    isValid: boolean;
}
