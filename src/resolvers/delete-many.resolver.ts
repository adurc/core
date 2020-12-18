import { AdurcDeleteArgs } from 'src/interfaces/client/delete.args';
import { BatchResult } from 'src/interfaces/client/batch-result';
import { ResolverMethod } from './resolver.method';

const deleteManyResolver: ResolverMethod<AdurcDeleteArgs, BatchResult> = async (
    _context,
    _model,
    _args,
) => {
    return null;
};

export default deleteManyResolver;