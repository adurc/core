import { AdurcModel } from '../interfaces/model';

export default abstract class AdurcIntrospector {
    abstract introspect(): Promise<AdurcModel[]> | AdurcModel[];
}