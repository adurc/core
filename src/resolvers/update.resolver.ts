import { AdurcUpdateProjection } from 'src/interfaces/client/update';
import { ResolverMethod } from './resolver.method';

const updateResolver: ResolverMethod<AdurcUpdateProjection, unknown> = async (
    _context,
    _model,
    _projection,
) => {
    return null;
};

export default updateResolver;