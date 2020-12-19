import { AdurcAggregateArgs } from './client/aggregate.args';
import { BatchResult } from './client/batch.result';
import { AdurcCreateArgs } from './client/create.args';
import { AdurcDeleteArgs } from './client/delete.args';
import { AdurcFindManyArgs } from './client/find-many.args';
import { AdurcUpdateArgs } from './client/update';

export interface AdurcDriver {
    init(): Promise<void>;

    createMany(args: AdurcCreateArgs): Promise<BatchResult>;
    findMany(args: AdurcFindManyArgs): Promise<unknown[]>;
    updateMany(args: AdurcUpdateArgs): Promise<BatchResult>;
    deleteMany(args: AdurcDeleteArgs): Promise<BatchResult>;
    aggregate(args: AdurcAggregateArgs): Promise<unknown>;
}