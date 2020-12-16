import { AdurcContext } from './interfaces/context';
import { IDriverCreateUpdateRes, TDriverReadRes, TDriverDeleteRes, IDriverAggregateRes } from './interfaces/driver';
import { AdurcDirectiveDefinition } from './interfaces/model';
import { ProjectionInfo } from './interfaces/projection';

export interface AdurcDriver {
    directives?: AdurcDirectiveDefinition[];

    setContext(context: AdurcContext): Promise<void>;

    create(projection: ProjectionInfo): Promise<IDriverCreateUpdateRes>;
    read(projection: ProjectionInfo): Promise<TDriverReadRes>;
    update(projection: ProjectionInfo): Promise<IDriverCreateUpdateRes>;
    delete(projection: ProjectionInfo): Promise<TDriverDeleteRes>;
    aggregate(projection: ProjectionInfo): Promise<IDriverAggregateRes>;
}