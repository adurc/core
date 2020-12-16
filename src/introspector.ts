import { AdurcModel } from './interfaces/model';

export interface AdurcIntrospector {
    introspect(): Promise<AdurcModel[]> | AdurcModel[];
}