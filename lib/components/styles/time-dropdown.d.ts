import { MODE } from '../../helpers/constants';
export declare const wrapper: (hour24Mode: boolean, mode: MODE) => import("@emotion/utils").SerializedStyles;
export declare const options: import("@emotion/utils").SerializedStyles;
interface OptionStyleProps {
    active: boolean;
    enabled: boolean;
}
export declare const option: ({ active, enabled }: OptionStyleProps) => import("@emotion/utils").SerializedStyles;
export {};
