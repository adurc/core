import { BatchResult } from 'src/interfaces/client/batch-result';
import { AdurcCreateArgs } from 'src/interfaces/client/create.args';
import { ResolverMethod } from './resolver.method';

const createManyResolver: ResolverMethod<AdurcCreateArgs, BatchResult> = async (
    _context,
    _model,
    _args,
) => {
    return null;
};

export default createManyResolver;