import { AdurcMethod, AdurcMethodFlags } from './client/methods';
import { AdurcDirectiveReference, AdurcModel, AdurcModelReference } from './model';

export type AdurcMiddlewareRequest = {
    method: AdurcMethod;
    model: AdurcModel;
    ctx: Record<string, unknown>;
    args: Record<string, unknown>;
};

export type AdurcMiddlewareNextCallback = () => Promise<unknown>;

export type AdurcMiddlewareAction = (
    req: AdurcMiddlewareRequest,
    next: AdurcMiddlewareNextCallback,
) => void | Promise<void>;

export interface AdurcMiddleware {
    method?: AdurcMethodFlags;
    model?: AdurcModelReference | AdurcModelReference[];
    directive?: AdurcDirectiveReference | AdurcDirectiveReference[];
    action: AdurcMiddlewareAction;
}