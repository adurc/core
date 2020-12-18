import { BatchResult } from 'src/interfaces/client/batch-result';
import { AdurcUpdateProjection } from 'src/interfaces/client/update';
import { ResolverMethod } from './resolver.method';

const updateManyResolver: ResolverMethod<AdurcUpdateProjection, BatchResult> = async (
    _context,
    _model,
    _projection,
) => {
    return null;
};

export default updateManyResolver;