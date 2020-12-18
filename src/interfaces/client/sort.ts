import { PrimitiveFields } from './common';

export declare const SortOrder: {
    asc: 'asc',
    desc: 'desc'
};

export declare type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];

export type AdurcModelOrderBy<T, K extends keyof PrimitiveFields<T> = keyof PrimitiveFields<T>> = { [P in K]?: SortOrder };