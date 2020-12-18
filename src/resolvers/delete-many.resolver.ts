import v8 from 'v8';

import { AdurcDeleteArgs } from 'src/interfaces/client/delete.args';
import { BatchResult } from 'src/interfaces/client/batch.result';
import { ResolverMethod } from './resolver.method';
import { AdurcModel } from 'src/interfaces/model';
import { AdurcContext } from 'src/interfaces/context';

const prepareSourceArgs = (_context: AdurcContext, _model: AdurcModel, args: AdurcDeleteArgs) => {
    const output: AdurcDeleteArgs = v8.deserialize(v8.serialize(args));
    return output;
};

const deleteManyResolver: ResolverMethod<AdurcDeleteArgs, BatchResult> = async (
    context,
    model,
    args,
) => {
    const source = context.sources.find(x => x.name === model.source);

    if (!source) {
        throw new Error(`Source ${model.source} not registered`);
    }

    const sourceArgs = prepareSourceArgs(context, model, args);

    const results = await source.driver.deleteMany(sourceArgs);

    return results;
};

export default deleteManyResolver;