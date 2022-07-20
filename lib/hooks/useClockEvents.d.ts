/// <reference types="react" />
import { ElementRef } from '../helpers/types';
declare type CalcTimeFromAngle = (angle: number, { canAutoChangeMode, wasTapped, }: {
    canAutoChangeMode: boolean;
    wasTapped: boolean;
    isInnerClick: boolean;
}) => void;
export default function useClockEvents(clock: ElementRef, handleChange: CalcTimeFromAngle): {
    bind: {
        onMouseDown: (e: React.MouseEvent<HTMLElement>) => void;
        ref: import("react").MutableRefObject<HTMLDivElement>;
    };
};
export {};
