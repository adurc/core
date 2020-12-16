import { AdurcContext } from '../interfaces/context';
import { AdurcDirectiveDefinition } from '../interfaces/model';
import { ProjectionInfo } from '../interfaces/projection';

export type CRUDA = 'create' | 'read' | 'update' | 'delete' | 'aggregate';

type CRUDAMethod = (projection: ProjectionInfo) => unknown | Promise<unknown>;

type CRUDADriver = {
    [method in CRUDA]: CRUDAMethod;
};

export interface IDriverCreateUpdateRes {
    returning?: Record<string, unknown>[];
    affectedRows?: number;
}

export type TDriverReadRes = Record<string, unknown>[];

export interface IDriverAggregateRes {
    aggregate: Record<string, unknown>;
}

export type TDriverDeleteRes = void;

export default abstract class AdurcDriver implements CRUDADriver {
    abstract name: string;
    abstract directives?: AdurcDirectiveDefinition[];

    abstract setContext(context: AdurcContext): void;
    abstract init(): Promise<void> | void;


    abstract create(projection: ProjectionInfo): Promise<IDriverCreateUpdateRes>;
    abstract read(projection: ProjectionInfo): Promise<TDriverReadRes>;
    abstract update(projection: ProjectionInfo): Promise<IDriverCreateUpdateRes>;
    abstract delete(projection: ProjectionInfo): Promise<TDriverDeleteRes>;
    abstract aggregate(projection: ProjectionInfo): Promise<IDriverAggregateRes>;
}