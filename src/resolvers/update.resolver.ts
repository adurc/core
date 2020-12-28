import v8 from 'v8';
import { BatchResult } from '../interfaces/client/batch.result';
import { AdurcUpdateArgs } from '../interfaces/client/update.args';
import { AdurcContext } from '../interfaces/context';
import { AdurcModel } from '../interfaces/model';

import { ResolverMethod } from './resolver.method';

const prepareSourceArgs = (_context: AdurcContext, _model: AdurcModel, args: AdurcUpdateArgs) => {
    const output: AdurcUpdateArgs = v8.deserialize(v8.serialize(args));
    return output;
};

const updateManyResolver: ResolverMethod<AdurcUpdateArgs, BatchResult> = async (
    context,
    model,
    args,
) => {
    const source = context.sources.find(x => x.name === model.source);

    if (!source) {
        throw new Error(`Source ${model.source} not registered`);
    }

    const sourceArgs = prepareSourceArgs(context, model, args);

    const results = await source.driver.updateMany(model, sourceArgs);

    return results;
};

export default updateManyResolver;