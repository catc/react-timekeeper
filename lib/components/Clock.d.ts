/// <reference types="react" />
import { ElementRef } from '../helpers/types';
interface Props {
    clockEl: ElementRef;
}
export default function ClockWrapper({ clockEl }: Props): JSX.Element;
export {};
