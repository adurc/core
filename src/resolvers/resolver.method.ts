import { AdurcContext } from '../interfaces/context';
import { AdurcModel } from '../interfaces/model';

export type ResolverMethod<T, R> = (context: AdurcContext, model: AdurcModel, args: T) => Promise<R>;