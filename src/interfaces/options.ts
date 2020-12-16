import Driver from '../bedrock/driver';
import AdurcIntrospector from '../bedrock/introspector';
import { AdurcDirectiveDefinition } from './model';

export interface AdurcOptions {
    introspectors: AdurcIntrospector[];
    sources: Map<string, Driver>;
    defaultSource: string;
    directives: AdurcDirectiveDefinition[];
}
