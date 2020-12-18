import { AdurcAggregateArgs } from 'src/interfaces/client/aggregate.args';
import { ResolverMethod } from './resolver.method';

const aggregateResolver: ResolverMethod<AdurcAggregateArgs, unknown> = async (
    _context,
    _model,
    _args,
) => {
    return null;
};

export default aggregateResolver;