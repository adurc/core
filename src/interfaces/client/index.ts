import { AdurcClientMethods } from './methods';

export type AdurcClient<T = unknown, K extends keyof T = keyof T> = {
    [P in K]: AdurcClientMethods<T[P]>
};