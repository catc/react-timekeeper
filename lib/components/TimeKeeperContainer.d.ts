/// <reference types="react" />
import { ConfigProps } from '../hooks/useConfigContext';
import { TimeInput, ChangeTimeFn } from '../helpers/types';
export interface Props extends ConfigProps {
    time?: TimeInput;
    onChange?: ChangeTimeFn;
    disabledTimeRange?: null | {
        from: string;
        to: string;
    };
}
export default function TimepickerWithConfig({ time, onChange, coarseMinutes, forceCoarseMinutes, switchToMinuteOnHourSelect, switchToMinuteOnHourDropdownSelect, closeOnMinuteSelect, hour24Mode, onDoneClick, doneButton, disabledTimeRange, }: Props): JSX.Element;
