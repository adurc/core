import { NumberFields } from './common';
import { AdurcModelUntyped } from './model';

export type AggregateNumberTyped<T, K extends keyof NumberFields<T> = keyof NumberFields<T>> = { [P in K]?: number };

export type AggregateNumberUntyped = { [field: string]: number };

export type AggregateNumber<T> = T extends AdurcModelUntyped ? AggregateNumberUntyped : AggregateNumberTyped<T>;

export type AggregateResult<T = AdurcModelUntyped> = {
    count?: number;
    avg?: AggregateNumber<T>;
    sum?: AggregateNumber<T>;
    min?: AggregateNumber<T>;
    max?: AggregateNumber<T>;
};