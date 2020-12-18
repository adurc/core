import { AdurcAggregateArgs } from './client/aggregate.args';
import { AdurcCreateArgs } from './client/create.args';
import { AdurcDeleteArgs } from './client/delete.args';
import { AdurcFindManyArgs } from './client/find-many.args';
import { AdurcUpdateArgs } from './client/update';

export interface AdurcDriver {
    createMany(args: AdurcCreateArgs): Promise<unknown>;
    findMany(args: AdurcFindManyArgs): Promise<unknown[]>;
    updateMany(args: AdurcUpdateArgs): Promise<unknown>;
    deleteMany(args: AdurcDeleteArgs): Promise<unknown>;
    aggregate(args: AdurcAggregateArgs): Promise<unknown>;
}