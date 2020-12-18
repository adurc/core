import v8 from 'v8';

import { AdurcAggregateArgs } from 'src/interfaces/client/aggregate.args';
import { AdurcContext } from 'src/interfaces/context';
import { AdurcModel } from 'src/interfaces/model';
import { ResolverMethod } from './resolver.method';

const prepareSourceArgs = (_context: AdurcContext, _model: AdurcModel, args: AdurcAggregateArgs) => {
    const output: AdurcAggregateArgs = v8.deserialize(v8.serialize(args));
    return output;
};

const aggregateResolver: ResolverMethod<AdurcAggregateArgs, unknown> = async (
    context,
    model,
    args,
) => {
    const source = context.sources.find(x => x.name === model.source);

    if (!source) {
        throw new Error(`Source ${model.source} not registered`);
    }

    const sourceArgs = prepareSourceArgs(context, model, args);

    const results = await source.driver.aggregate(sourceArgs);

    return results;
};

export default aggregateResolver;