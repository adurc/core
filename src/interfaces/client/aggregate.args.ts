import { NumberFields } from './common';
import { AdurcModelUntyped } from './model';
import { AdurcModelOrderBy } from './sort';
import { AdurcModelWhere } from './where';

export type AggregateNumberTyped<T, K extends keyof NumberFields<T> = keyof NumberFields<T>> = { [P in K]?: boolean };

export type AggregateNumberUntyped = { [field: string]: boolean };

export type AggregateNumber<T> = T extends AdurcModelUntyped ? AggregateNumberUntyped : AggregateNumberTyped<T>;

export type AdurcAggregateArgs<T = AdurcModelUntyped> = {
    where?: AdurcModelWhere<T>;
    orderBy?: AdurcModelOrderBy<T>;
    take?: number;
    skip?: number;
    count?: number;
    avg?: AggregateNumber<T>;
    sum?: AggregateNumber<T>;
    min?: AggregateNumber<T>;
    max?: AggregateNumber<T>;
};