import DisabledTimeRange from './disable-time';
import { Time, TimeInput, TimeOutput } from './types';
export declare const TIME_PARSE_24: RegExp;
export declare function parseTime(time?: TimeInput): Time;
export declare function parseMeridiem(time: TimeInput): string;
export declare function composeTime(hour: number, minute: number, disabledTimeRangeValidator: DisabledTimeRange | null): TimeOutput;
