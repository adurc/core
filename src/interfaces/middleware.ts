import { AdurcMethod, AdurcMethodFlags } from './client/methods';
import { AdurcModel } from './model';

export type AdurcMiddlewareRequest = {
    method: AdurcMethod;
    ctx: Record<string, unknown>,
    model: AdurcModel;
    args: Record<string, unknown>,
};

export type AdurcMiddlewareNextCallback = () => Promise<unknown>;

export type AdurcMiddlewareAction = (
    req: AdurcMiddlewareRequest,
    next: AdurcMiddlewareNextCallback,
) => void | Promise<void>;

export interface AdurcMiddleware {
    method?: AdurcMethodFlags;
    model?: { source: string, name: string };
    action: AdurcMiddlewareAction;
}