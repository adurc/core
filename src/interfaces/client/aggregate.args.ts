import { NumberFields } from './common';

export type AggregateNumber<T, K extends keyof NumberFields<T> = keyof NumberFields<T>> = { [P in K]?: boolean };

export type AdurcAggregateArgs<T = unknown> = {
    count?: number;
    avg?: AggregateNumber<T>;
    sum?: AggregateNumber<T>;
    min?: AggregateNumber<T>;
    max?: AggregateNumber<T>;
};