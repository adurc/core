import { AdurcDriver } from './driver';
import { AdurcDirectiveDefinition } from './model';

export interface AdurcOptions {
    sources: Map<string, AdurcDriver>;
    defaultSource: string;
    directives: AdurcDirectiveDefinition[];
}
