import { MODE } from './constants';
import { Time } from './types';
export declare function getTimeValue(mode: MODE, time: Time): number;
export declare function getNormalizedTimeValue(mode: MODE, time: Time): number;
export declare function isHourMode(mode: MODE): boolean;
export declare function isMinuteMode(mode: MODE): boolean;
export declare function isSameTime(prev: Time, next: Time): boolean;
