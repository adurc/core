import { AdurcAggregateArgs } from './aggregate.args';
import { BatchResult } from './batch.result';
import { AdurcCreateArgs } from './create.args';
import { AdurcDeleteArgs } from './delete.args';
import { AdurcFindManyArgs } from './find-many.args';
import { AdurcUpdateArgs } from './update';

export type AdurcClientMethodFindMany<T = unknown> = (args: AdurcFindManyArgs<T>) => Promise<T[]>;
export type AdurcClientMethodCreateMany<T = unknown> = (args: AdurcCreateArgs<T>) => Promise<BatchResult<T>>;
export type AdurcClientMethodUpdateMany<T = unknown> = (args: AdurcUpdateArgs<T>) => Promise<BatchResult<T>>;
export type AdurcClientMethodDeleteMany<T = unknown> = (args: AdurcDeleteArgs<T>) => Promise<BatchResult<T>>;
export type AdurcClientMethodAggregate<T = unknown> = (args: AdurcAggregateArgs<T>) => Promise<unknown>;

export type AdurcClientMethods<T = unknown> = {
    findMany: AdurcClientMethodFindMany<T>;
    createMany: AdurcClientMethodCreateMany<T>;
    updateMany: AdurcClientMethodUpdateMany<T>;
    deleteMany: AdurcClientMethodDeleteMany<T>;
    aggregate: AdurcClientMethodAggregate<T>;
};
