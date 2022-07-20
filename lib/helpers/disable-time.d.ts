export default class DisabledTimeRange {
    constructor(from: string, to: string);
    validateHour: (hour: number) => boolean;
    validateMinute: (hour: number, minute: number) => boolean;
}
