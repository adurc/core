import { AdurcClientMethods } from './methods';
import { AdurcModelUntyped } from './model';

export type AdurcClient<T = Record<string, AdurcModelUntyped>, K extends keyof T = keyof T> = {
    [P in K]: AdurcClientMethods<T[P]>
};