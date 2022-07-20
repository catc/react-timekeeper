export declare function getScrollBarWidth(): number;
export declare type CalcOffsetFn = (x: number, y: number) => {
    offsetX: number;
    offsetY: number;
};
export declare function calcOffset(el: HTMLDivElement): CalcOffsetFn;
