import { AdurcAggregateArgs } from './client/aggregate.args';
import { BatchResult } from './client/batch.result';
import { AdurcCreateArgs } from './client/create.args';
import { AdurcDeleteArgs } from './client/delete.args';
import { AdurcFindManyArgs } from './client/find-many.args';
import { AdurcUpdateArgs } from './client/update';
import { AdurcContext } from './context';

export interface AdurcDriver {
    setContext(context: AdurcContext): Promise<void> | void;
    init(): Promise<void> | void;

    createMany(args: AdurcCreateArgs): Promise<BatchResult> | BatchResult;
    findMany(args: AdurcFindManyArgs): Promise<unknown[]> | unknown[];
    updateMany(args: AdurcUpdateArgs): Promise<BatchResult> | BatchResult;
    deleteMany(args: AdurcDeleteArgs): Promise<BatchResult> | BatchResult;
    aggregate(args: AdurcAggregateArgs): Promise<unknown> | unknown;
}