import { AdurcDeleteProjection } from 'src/interfaces/client/delete';
import { BatchResult } from 'src/interfaces/client/batch-result';
import { ResolverMethod } from './resolver.method';

const deleteManyResolver: ResolverMethod<AdurcDeleteProjection, BatchResult> = async (
    _context,
    _model,
    _projection,
) => {
    return null;
};

export default deleteManyResolver;