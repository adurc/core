import { AdurcContext } from 'src/interfaces/context';
import { AdurcModel } from 'src/interfaces/model';

export type ResolverMethod<T, R> = (context: AdurcContext, model: AdurcModel, args: T) => Promise<R>;