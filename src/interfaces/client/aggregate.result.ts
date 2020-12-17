import { NumberFields } from './common';

export type AggregateNumber<T, K extends keyof NumberFields<T> = keyof NumberFields<T>> = { [P in K]?: number };

export type AggregateResult<T = unknown> = {
    avg?: AggregateNumber<T>;
    sum?: AggregateNumber<T>;
    min?: AggregateNumber<T>;
    max?: AggregateNumber<T>;
};