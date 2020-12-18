import { AdurcAggregateProjection } from 'src/interfaces/client/aggregate';
import { ResolverMethod } from './resolver.method';

const aggregateResolver: ResolverMethod<AdurcAggregateProjection, unknown> = async (
    _context,
    _model,
    _projection,
) => {
    return null;
};

export default aggregateResolver;