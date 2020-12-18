import { AdurcAggregateProjection } from './client/aggregate';
import { AdurcCreateProjection } from './client/create';
import { AdurcDeleteProjection } from './client/delete';
import { AdurcReadProjection } from './client/read';
import { AdurcUpdateProjection } from './client/update';

export interface AdurcDriver {
    create(projection: AdurcCreateProjection): Promise<unknown>;
    read(projection: AdurcReadProjection): Promise<unknown[]>;
    update(projection: AdurcUpdateProjection): Promise<unknown>;
    delete(projection: AdurcDeleteProjection): Promise<unknown>;
    aggregate(projection: AdurcAggregateProjection): Promise<unknown>;
}