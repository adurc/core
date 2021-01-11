import { AdurcSchema } from '../schema';
import { AdurcMethods } from './methods';
import { AdurcModelUntyped } from './model';

export type AdurcUntyped = {
    [model: string]: AdurcMethods<AdurcModelUntyped>
};

export type AdurcTyped<T = Record<string, AdurcModelUntyped>, K extends keyof T = keyof T> = {
    [P in K]: AdurcMethods<T[P]>
}

export type Adurc<T = Record<string, AdurcModelUntyped>, TContext = Record<string, unknown>> = {
    schema: AdurcSchema;
    context: Readonly<TContext>;
    withContext<TSubContext = Record<string, unknown>>(ctx: TSubContext): Adurc<T, TContext & TSubContext>;
    client: (T extends Record<string, AdurcModelUntyped> ? AdurcUntyped : AdurcTyped<T>);
};