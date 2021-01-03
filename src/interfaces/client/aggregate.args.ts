import { NumberFields } from './common';
import { AdurcModelUntyped } from './model';
import { AdurcPaginationArgs } from './pagination.args';
import { AdurcOrderArgs } from './sort.args';
import { AdurcWhereArgs } from './where.args';

export type AggregateNumberTyped<T, K extends keyof NumberFields<T> = keyof NumberFields<T>> = { [P in K]?: true };

export type AggregateNumberUntyped = { [field: string]: true };

export type AggregateNumber<T = AdurcModelUntyped> = T extends AdurcModelUntyped ? AggregateNumberUntyped : AggregateNumberTyped<T>;

export type AdurcAggregateArgs<T = AdurcModelUntyped> =
    Partial<AdurcWhereArgs<T>>
    & Partial<AdurcOrderArgs<T>>
    & Partial<AdurcPaginationArgs>
    & Partial<{
        count: true;
        avg: AggregateNumber<T>;
        sum: AggregateNumber<T>;
        min: AggregateNumber<T>;
        max: AggregateNumber<T>;
    }>;