/// <reference types="react" />
import { Time } from '../helpers/types';
import { MODE } from '../helpers/constants';
interface Props {
    mode: MODE;
    time: Time;
}
export default function ClockHand({ mode, time }: Props): JSX.Element;
export {};
