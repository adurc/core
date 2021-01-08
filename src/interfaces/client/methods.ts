import { AdurcAggregateArgs } from './aggregate.args';
import { AggregateResult } from './aggregate.result';
import { BatchResult } from './batch.result';
import { AdurcCreateArgs } from './create.args';
import { AdurcDeleteArgs } from './delete.args';
import { AdurcFindUniqueArgs } from './find-first.args';
import { AdurcFindManyArgs } from './find-many.args';
import { AdurcModelUntyped } from './model';
import { AdurcUpdateArgs } from './update.args';

export enum AdurcMethod {
    FindMany = 0,
    FindUnique = 1,
    CreateMany = 2,
    UpdateMany = 3,
    DeleteMany = 4,
    Aggregate = 5,
}

export enum AdurcMethodFlags {
    FindMany = 1 << 0,
    FindUnique = 1 << 1,
    CreateMany = 1 << 2,
    UpdateMany = 1 << 3,
    DeleteMany = 1 << 4,
    Aggregate = 1 << 5,
    All = ~(~0 << 6)
}

export type AdurcMethodFindMany<T = AdurcModelUntyped> = (args: AdurcFindManyArgs<T>) => Promise<T[]>;
export type AdurcMethodFindUnique<T = AdurcModelUntyped> = (args: AdurcFindUniqueArgs<T>) => Promise<T | null>;
export type AdurcMethodCreateMany<T = AdurcModelUntyped> = (args: AdurcCreateArgs<T>) => Promise<BatchResult<T>>;
export type AdurcMethodUpdateMany<T = AdurcModelUntyped> = (args: AdurcUpdateArgs<T>) => Promise<BatchResult<T>>;
export type AdurcMethodDeleteMany<T = AdurcModelUntyped> = (args: AdurcDeleteArgs<T>) => Promise<BatchResult<T>>;
export type AdurcMethodAggregate<T = AdurcModelUntyped> = (args: AdurcAggregateArgs<T>) => Promise<AggregateResult<T>>;

export type AdurcMethods<T = AdurcModelUntyped> = {
    findMany: AdurcMethodFindMany<T>;
    findUnique: AdurcMethodFindUnique<T>;
    createMany: AdurcMethodCreateMany<T>;
    updateMany: AdurcMethodUpdateMany<T>;
    deleteMany: AdurcMethodDeleteMany<T>;
    aggregate: AdurcMethodAggregate<T>;
};
