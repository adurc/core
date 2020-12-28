import { AdurcAggregateArgs } from './aggregate.args';
import { BatchResult } from './batch.result';
import { AdurcCreateArgs } from './create.args';
import { AdurcDeleteArgs } from './delete.args';
import { AdurcFindManyArgs } from './find-many.args';
import { AdurcModelUntyped } from './model';
import { AdurcUpdateArgs } from './update.args';

export type AdurcClientMethodFindMany<T = AdurcModelUntyped> = (args: AdurcFindManyArgs<T>) => Promise<T[]>;
export type AdurcClientMethodCreateMany<T = AdurcModelUntyped> = (args: AdurcCreateArgs<T>) => Promise<BatchResult<T>>;
export type AdurcClientMethodUpdateMany<T = AdurcModelUntyped> = (args: AdurcUpdateArgs<T>) => Promise<BatchResult<T>>;
export type AdurcClientMethodDeleteMany<T = AdurcModelUntyped> = (args: AdurcDeleteArgs<T>) => Promise<BatchResult<T>>;
export type AdurcClientMethodAggregate<T = AdurcModelUntyped> = (args: AdurcAggregateArgs<T>) => Promise<unknown>;

export type AdurcClientMethods<T = AdurcModelUntyped> = {
    findMany: AdurcClientMethodFindMany<T>;
    createMany: AdurcClientMethodCreateMany<T>;
    updateMany: AdurcClientMethodUpdateMany<T>;
    deleteMany: AdurcClientMethodDeleteMany<T>;
    aggregate: AdurcClientMethodAggregate<T>;
};
