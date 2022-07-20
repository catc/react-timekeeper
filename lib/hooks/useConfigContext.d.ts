import React, { ReactElement } from 'react';
import { TimeOutput } from '../helpers/types';
declare type DoneClickFn = null | ((time: TimeOutput, Event?: React.MouseEvent) => void);
declare type DoneButton = null | ((time: TimeOutput) => ReactElement);
interface Config {
    coarseMinutes: number;
    forceCoarseMinutes: boolean;
    switchToMinuteOnHourSelect: boolean;
    switchToMinuteOnHourDropdownSelect: boolean;
    closeOnMinuteSelect: boolean;
    hour24Mode: boolean;
    onDoneClick: DoneClickFn;
    doneButton: DoneButton;
}
export declare type ConfigProps = Partial<Config>;
interface Props extends ConfigProps {
    children: ReactElement;
}
export declare const configContext: React.Context<Config>;
export declare function ConfigProvider({ children, coarseMinutes, forceCoarseMinutes, switchToMinuteOnHourSelect, switchToMinuteOnHourDropdownSelect, closeOnMinuteSelect, hour24Mode, onDoneClick, doneButton, }: Props): JSX.Element;
export default function useConfig(): Config;
export {};
