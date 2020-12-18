import { AdurcModel } from 'src/interfaces/model';
import { ResolverContext } from './resolver.context';

export type ResolverMethod<T, R> = (context: ResolverContext, model: AdurcModel, projection: T) => Promise<R>;