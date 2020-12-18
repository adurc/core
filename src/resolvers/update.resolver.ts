import v8 from 'v8';

import { BatchResult } from 'src/interfaces/client/batch.result';
import { AdurcUpdateArgs } from 'src/interfaces/client/update';
import { ResolverMethod } from './resolver.method';
import { AdurcModel } from 'src/interfaces/model';
import { ResolverContext } from './resolver.context';

const prepareSourceArgs = (_context: ResolverContext, _model: AdurcModel, args: AdurcUpdateArgs) => {
    const output: AdurcUpdateArgs = v8.deserialize(v8.serialize(args));
    return output;
};

const updateManyResolver: ResolverMethod<AdurcUpdateArgs, BatchResult> = async (
    context,
    model,
    args,
) => {
    const source = context.sources[model.source];

    if (!source) {
        throw new Error(`Source ${model.source} not registered`);
    }

    const sourceArgs = prepareSourceArgs(context, model, args);

    const results = await source.updateMany(sourceArgs);

    return results;
};

export default updateManyResolver;