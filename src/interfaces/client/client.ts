import { AdurcAggregateProjection } from './aggregate';
import { AdurcCreateProjection } from './create';
import { AdurcDeleteProjection } from './delete';
import { AdurcReadProjection } from './read';
import { AdurcUpdateProjection } from './update';

export type AdurcClientMethodRead<T = unknown> = (projection: AdurcReadProjection<T>) => Promise<T[]>;
export type AdurcClientMethodCreate<T = unknown> = (projection: AdurcCreateProjection<T>) => Promise<unknown>;
export type AdurcClientMethodUpdate<T = unknown> = (projection: AdurcUpdateProjection<T>) => Promise<unknown>;
export type AdurcClientMethodDelete<T = unknown> = (projection: AdurcDeleteProjection<T>) => Promise<unknown>;
export type AdurcClientMethodAggregate<T = unknown> = (projection: AdurcAggregateProjection<T>) => Promise<unknown>;

export type AdurcClientMethods<T = unknown> = {
    read: AdurcClientMethodRead<T>;
    create: AdurcClientMethodCreate<T>;
    update: AdurcClientMethodUpdate<T>;
    delete: AdurcClientMethodDelete<T>;
    aggregate: AdurcClientMethodAggregate<T>;
};

export type AdurcClient<T = unknown, K extends keyof T = keyof T> = { [P in K]: AdurcClientMethods<T[P]> };