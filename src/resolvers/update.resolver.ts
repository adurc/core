import { BatchResult } from 'src/interfaces/client/batch-result';
import { AdurcUpdateArgs } from 'src/interfaces/client/update';
import { ResolverMethod } from './resolver.method';

const updateManyResolver: ResolverMethod<AdurcUpdateArgs, BatchResult> = async (
    _context,
    _model,
    _args,
) => {
    return null;
};

export default updateManyResolver;