import { AdurcDirectiveDefinition } from './directive-definition';
import { AdurcModel } from './model';
import { AdurcSource } from './source';

export interface AdurcContext {
    sources: AdurcSource[];
    models: AdurcModel[];
    directives: AdurcDirectiveDefinition[];
}
