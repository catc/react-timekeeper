/// <reference types="react" />
import { SpringValue } from 'react-spring';
import DisabledTimeRange from '../helpers/disable-time';
import { MODE, MERIDIEM } from '../helpers/constants';
interface CommonProps {
    disabledTimeRangeValidator: DisabledTimeRange | null;
    anim: {
        opacity: SpringValue<number>;
        translate: SpringValue<number>;
        translateInner: SpringValue<number>;
    };
}
interface MinuteProps extends CommonProps {
    hour: number;
}
interface HourProps extends CommonProps {
    mode: MODE.HOURS_12 | MODE.HOURS_24;
    hour24Mode: boolean;
    meridiem: MERIDIEM;
}
declare function Hours({ anim, mode, hour24Mode, disabledTimeRangeValidator, meridiem, }: HourProps): JSX.Element;
export declare const HourNumbers: import("react").MemoExoticComponent<typeof Hours>;
declare function Minutes({ anim, hour, disabledTimeRangeValidator }: MinuteProps): JSX.Element;
export declare const MinuteNumbers: import("react").MemoExoticComponent<typeof Minutes>;
export {};
