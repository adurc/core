import { BatchResult } from 'src/interfaces/client/batch-result';
import { AdurcCreateProjection } from 'src/interfaces/client/create';
import { ResolverMethod } from './resolver.method';

const createResolver: ResolverMethod<AdurcCreateProjection, BatchResult> = async (
    _context,
    _model,
    _projection,
) => {
    return null;
};

export default createResolver;