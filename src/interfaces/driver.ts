import { AdurcAggregateArgs } from './client/aggregate.args';
import { AggregateResult } from './client/aggregate.result';
import { BatchResult } from './client/batch.result';
import { AdurcCreateArgs } from './client/create.args';
import { AdurcDeleteArgs } from './client/delete.args';
import { AdurcFindManyArgs } from './client/find-many.args';
import { AdurcModelUntyped } from './client/model';
import { AdurcUpdateArgs } from './client/update.args';
import { AdurcModel } from './model';

export interface AdurcDriver {
    createMany(model: AdurcModel, args: AdurcCreateArgs): Promise<BatchResult> | BatchResult;
    findMany(model: AdurcModel, args: AdurcFindManyArgs): Promise<AdurcModelUntyped[]> | AdurcModelUntyped[];
    updateMany(model: AdurcModel, args: AdurcUpdateArgs): Promise<BatchResult> | BatchResult;
    deleteMany(model: AdurcModel, args: AdurcDeleteArgs): Promise<BatchResult> | BatchResult;
    aggregate(model: AdurcModel, args: AdurcAggregateArgs): Promise<AggregateResult> | AggregateResult;
}