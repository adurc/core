import { AdurcAggregateArgs } from '../../interfaces/client/aggregate.args';
import { AggregateResult } from '../../interfaces/client/aggregate.result';
import { BatchResult } from '../../interfaces/client/batch.result';
import { AdurcCreateArgs } from '../../interfaces/client/create.args';
import { AdurcDeleteArgs } from '../../interfaces/client/delete.args';
import { AdurcFindManyArgs } from '../../interfaces/client/find-many.args';
import { AdurcModelUntyped } from '../../interfaces/client/model';
import { AdurcUpdateArgs } from '../../interfaces/client/update.args';
import { AdurcDriver } from '../../interfaces/driver';
import { AdurcModel } from '../../interfaces/model';

class MockDriver implements AdurcDriver {

    init(): Promise<void> {
        return Promise.resolve();
    }
    createMany(_model: AdurcModel, _args: AdurcCreateArgs): Promise<BatchResult> {
        return Promise.resolve({ count: 0, returning: [] });
    }
    findMany(_model: AdurcModel, _args: AdurcFindManyArgs): Promise<AdurcModelUntyped[]> {
        return Promise.resolve([]);
    }
    updateMany(_model: AdurcModel, _args: AdurcUpdateArgs): Promise<BatchResult> {
        return Promise.resolve({ count: 0, returning: [] });
    }
    deleteMany(_model: AdurcModel, _args: AdurcDeleteArgs): Promise<BatchResult> {
        return Promise.resolve({ count: 0, returning: [] });
    }
    aggregate(_model: AdurcModel, _args: AdurcAggregateArgs): Promise<AggregateResult> {
        return Promise.resolve({ count: 0, returning: [] });
    }

}

export default MockDriver;