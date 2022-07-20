import { ReactElement } from 'react';
import { TimeInput, ChangeTimeFn, Time, TimeOutput } from '../helpers/types';
import { MODE, MERIDIEM } from '../helpers/constants';
import DisabledTimeRange from '../helpers/disable-time';
interface Props {
    time?: TimeInput;
    onChange?: ChangeTimeFn;
    children: ReactElement;
    disabledTimeRange?: null | {
        from: string;
        to: string;
    };
}
declare type UpdateTimeValueSource = {
    type: 'clock';
    canAutoChangeMode: boolean;
} | {
    type: 'dropdown';
};
interface StateContext {
    time: Time;
    mode: MODE;
    updateTimeValue: (val: number, source: UpdateTimeValueSource) => void;
    updateMeridiem: (meridiem: MERIDIEM) => void;
    setMode: (mode: MODE) => void;
    getComposedTime: () => TimeOutput;
    disabledTimeRangeValidator: DisabledTimeRange | null;
    meridiem: MERIDIEM;
}
export declare const stateContext: import("react").Context<StateContext>;
export declare function StateProvider({ onChange, time: parentTime, children, disabledTimeRange, }: Props): JSX.Element;
export default function useTimekeeperState(): StateContext;
export {};
