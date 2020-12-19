import { AdurcAggregateArgs } from '../../interfaces/client/aggregate.args';
import { BatchResult } from '../../interfaces/client/batch.result';
import { AdurcCreateArgs } from '../../interfaces/client/create.args';
import { AdurcDeleteArgs } from '../../interfaces/client/delete.args';
import { AdurcFindManyArgs } from '../../interfaces/client/find-many.args';
import { AdurcUpdateArgs } from '../../interfaces/client/update';
import { AdurcContext } from '../../interfaces/context';
import { AdurcDriver } from '../../interfaces/driver';

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
    createMany(_args: AdurcCreateArgs<unknown, never>): Promise<BatchResult<unknown>> {
        return Promise.resolve({ count: 0, returning: [] });
    }
    findMany(_args: AdurcFindManyArgs<unknown>): Promise<unknown[]> {
        return Promise.resolve([]);
    }
    updateMany(_args: AdurcUpdateArgs<unknown, never>): Promise<BatchResult<unknown>> {
        return Promise.resolve({ count: 0, returning: [] });
    }
    deleteMany(_args: AdurcDeleteArgs<unknown>): Promise<BatchResult<unknown>> {
        return Promise.resolve({ count: 0, returning: [] });
    }
    aggregate(_args: AdurcAggregateArgs<unknown>): Promise<unknown> {
        return Promise.resolve({ count: 0, returning: [] });
    }

}

export default MockDriver;