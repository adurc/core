import { AdurcMethods } from './methods';
import { AdurcModelUntyped } from './model';

export type Adurc<T = Record<string, AdurcModelUntyped>, K extends keyof T = keyof T> = {
    [P in K]: AdurcMethods<T[P]>
};