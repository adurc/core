import { AdurcDirectiveDefinition, AdurcModel } from './model';
import { AdurcSource } from './source';

export interface AdurcContext {
    sources: AdurcSource[];
    models: AdurcModel[];
    directives: AdurcDirectiveDefinition[];
}
