import { AdurcAggregateArgs } from '../../interfaces/client/aggregate.args';
import { BatchResult } from '../../interfaces/client/batch.result';
import { AdurcCreateArgs } from '../../interfaces/client/create.args';
import { AdurcDeleteArgs } from '../../interfaces/client/delete.args';
import { AdurcFindManyArgs } from '../../interfaces/client/find-many.args';
import { AdurcUpdateArgs } from '../../interfaces/client/update.args';
import { AdurcContext } from '../../interfaces/context';
import { AdurcDriver } from '../../interfaces/driver';
import { AdurcModel } from '../../interfaces/model';

class MockDriver implements AdurcDriver {

    public name: string;
    public context: AdurcContext;

    constructor(name: string) { this.name = name; }

    setContext(context: AdurcContext): void {
        this.context = context;
    }

    init(): Promise<void> {
        return Promise.resolve();
    }
    createMany(_model: AdurcModel, _args: AdurcCreateArgs<unknown, never>): Promise<BatchResult<unknown>> {
        return Promise.resolve({ count: 0, returning: [] });
    }
    findMany(_model: AdurcModel, _args: AdurcFindManyArgs<unknown>): Promise<unknown[]> {
        return Promise.resolve([]);
    }
    updateMany(_model: AdurcModel, _args: AdurcUpdateArgs<unknown, never>): Promise<BatchResult<unknown>> {
        return Promise.resolve({ count: 0, returning: [] });
    }
    deleteMany(_model: AdurcModel, _args: AdurcDeleteArgs<unknown>): Promise<BatchResult<unknown>> {
        return Promise.resolve({ count: 0, returning: [] });
    }
    aggregate(_model: AdurcModel, _args: AdurcAggregateArgs<unknown>): Promise<unknown> {
        return Promise.resolve({ count: 0, returning: [] });
    }

}

export default MockDriver;