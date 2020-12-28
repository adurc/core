import { PrimitiveFields } from './common';
import { AdurcModelUntyped } from './model';

export declare const SortOrder: {
    asc: 'asc',
    desc: 'desc'
};

export declare type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];

export type AdurcModelOrderByTyped<T, K extends keyof PrimitiveFields<T> = keyof PrimitiveFields<T>> = { [P in K]?: SortOrder };

export type AdurcModelOrderByUntyped = { [field: string]: SortOrder };

export type AdurcModelOrderBy<T> = T extends AdurcModelUntyped ? AdurcModelOrderByUntyped : AdurcModelOrderByTyped<T>;