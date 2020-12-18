import v8 from 'v8';

import { AdurcDeleteArgs } from 'src/interfaces/client/delete.args';
import { BatchResult } from 'src/interfaces/client/batch.result';
import { ResolverMethod } from './resolver.method';
import { AdurcModel } from 'src/interfaces/model';
import { ResolverContext } from './resolver.context';

const prepareSourceArgs = (_context: ResolverContext, _model: AdurcModel, args: AdurcDeleteArgs) => {
    const output: AdurcDeleteArgs = v8.deserialize(v8.serialize(args));
    return output;
};

const deleteManyResolver: ResolverMethod<AdurcDeleteArgs, BatchResult> = async (
    context,
    model,
    args,
) => {
    const source = context.sources[model.source];

    if (!source) {
        throw new Error(`Source ${model.source} not registered`);
    }

    const sourceArgs = prepareSourceArgs(context, model, args);

    const results = await source.deleteMany(sourceArgs);

    return results;
};

export default deleteManyResolver;