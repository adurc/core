import v8 from 'v8';

import { BatchResult } from 'src/interfaces/client/batch.result';
import { AdurcCreateArgs } from 'src/interfaces/client/create.args';
import { AdurcModel } from 'src/interfaces/model';
import { ResolverContext } from './resolver.context';
import { ResolverMethod } from './resolver.method';


const prepareSourceArgs = (_context: ResolverContext, _model: AdurcModel, args: AdurcCreateArgs) => {
    const output: AdurcCreateArgs = v8.deserialize(v8.serialize(args));
    return output;
};

const createManyResolver: ResolverMethod<AdurcCreateArgs, BatchResult> = async (
    context,
    model,
    args,
) => {
    const source = context.sources[model.source];

    if (!source) {
        throw new Error(`Source ${model.source} not registered`);
    }

    const sourceArgs = prepareSourceArgs(context, model, args);

    const results = await source.createMany(sourceArgs);

    return results;
};

export default createManyResolver;