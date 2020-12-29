import { AggregateResult } from 'src/interfaces/client/aggregate.result';
import v8 from 'v8';
import { AdurcAggregateArgs } from '../interfaces/client/aggregate.args';
import { AdurcContext } from '../interfaces/context';
import { AdurcModel } from '../interfaces/model';
import { ResolverMethod } from './resolver.method';

const prepareSourceArgs = (_context: AdurcContext, _model: AdurcModel, args: AdurcAggregateArgs) => {
    const output: AdurcAggregateArgs = v8.deserialize(v8.serialize(args));
    return output;
};

const aggregateResolver: ResolverMethod<AdurcAggregateArgs, AggregateResult> = async (
    context,
    model,
    args,
) => {
    const source = context.sources.find(x => x.name === model.source);

    if (!source) {
        throw new Error(`Source ${model.source} not registered`);
    }

    const sourceArgs = prepareSourceArgs(context, model, args);

    const results = await source.driver.aggregate(model, sourceArgs);

    return results;
};

export default aggregateResolver;