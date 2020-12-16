import { AdurcDriver, AdurcIntrospector } from 'src';
import { AdurcDirectiveDefinition } from './model';

export interface AdurcOptions {
    introspectors: AdurcIntrospector[];
    sources: Map<string, AdurcDriver>;
    defaultSource: string;
    directives: AdurcDirectiveDefinition[];
}
