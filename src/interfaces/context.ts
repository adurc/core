import { AdurcDirectiveDefinition } from './directive-definition';
import { AdurcMiddleware } from './middleware';
import { AdurcModel } from './model';
import { AdurcSource } from './source';

export interface AdurcSchema {
    sources: ReadonlyArray<AdurcSource>;
    models: ReadonlyArray<AdurcModel>;
    directives: ReadonlyArray<AdurcDirectiveDefinition>;
    middlewares: ReadonlyArray<AdurcMiddleware>;
}