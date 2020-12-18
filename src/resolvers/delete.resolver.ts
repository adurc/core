import { AdurcDeleteProjection } from 'src/interfaces/client/delete';
import { ResolverMethod } from './resolver.method';

const deleteResolver: ResolverMethod<AdurcDeleteProjection, unknown> = async (
    _context,
    _model,
    _projection,
) => {
    return null;
};

export default deleteResolver;