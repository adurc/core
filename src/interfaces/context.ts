import { Adurc } from '../adurc';
import { AdurcLoggerManager } from '../logger-manager';
import { AdurcDirectiveDefinition } from './directive-definition';
import { IAdurcLogger } from './logger';
import { AdurcModel } from './model';
import { AdurcSource } from './source';

export interface AdurcContext {
    logger: IAdurcLogger;
    sources: AdurcSource[];
    models: AdurcModel[];
    directives: AdurcDirectiveDefinition[];
}


export interface AdurcContextBuilder {
    logger: AdurcLoggerManager;
    sources: AdurcSource[];
    models: AdurcModel[];
    directives: AdurcDirectiveDefinition[];
    adurc?: Adurc;
}
