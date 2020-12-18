import v8 from 'v8';

import { BatchResult } from 'src/interfaces/client/batch.result';
import { AdurcCreateArgs } from 'src/interfaces/client/create.args';
import { AdurcModel } from 'src/interfaces/model';
import { ResolverMethod } from './resolver.method';
import { AdurcContext } from 'src/interfaces/context';


const prepareSourceArgs = (_context: AdurcContext, _model: AdurcModel, args: AdurcCreateArgs) => {
    const output: AdurcCreateArgs = v8.deserialize(v8.serialize(args));
    return output;
};

const createManyResolver: ResolverMethod<AdurcCreateArgs, BatchResult> = async (
    context,
    model,
    args,
) => {
    const source = context.sources.find(x => x.name === model.source);

    if (!source) {
        throw new Error(`Source ${model.source} not registered`);
    }

    const sourceArgs = prepareSourceArgs(context, model, args);

    const results = await source.driver.createMany(sourceArgs);

    return results;
};

export default createManyResolver;