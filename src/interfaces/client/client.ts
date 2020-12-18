import { AdurcAggregateProjection } from './aggregate';
import { AdurcCreateProjection } from './create';
import { AdurcDeleteProjection } from './delete';
import { BatchResult } from './batch-result';
import { AdurcReadProjection } from './read';
import { AdurcUpdateProjection } from './update';

export type AdurcClientMethodFindMany<T = unknown> = (projection: AdurcReadProjection<T>) => Promise<T[]>;
export type AdurcClientMethodCreateMany<T = unknown> = (projection: AdurcCreateProjection<T>) => Promise<BatchResult<T>>;
export type AdurcClientMethodUpdateMany<T = unknown> = (projection: AdurcUpdateProjection<T>) => Promise<BatchResult<T>>;
export type AdurcClientMethodDeleteMany<T = unknown> = (projection: AdurcDeleteProjection<T>) => Promise<BatchResult<T>>;
export type AdurcClientMethodAggregate<T = unknown> = (projection: AdurcAggregateProjection<T>) => Promise<unknown>;

export type AdurcClientMethods<T = unknown> = {
    findMany: AdurcClientMethodFindMany<T>;
    createMany: AdurcClientMethodCreateMany<T>;
    updateMany: AdurcClientMethodUpdateMany<T>;
    deleteMany: AdurcClientMethodDeleteMany<T>;
    aggregate: AdurcClientMethodAggregate<T>;
};

export type AdurcClient<T = unknown, K extends keyof T = keyof T> = { [P in K]: AdurcClientMethods<T[P]> };