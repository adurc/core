import { AdurcDriver } from 'src/interfaces/driver';
import { AdurcModel } from 'src/interfaces/model';

export type ResolverContext = {
    sources: Record<string, AdurcDriver>;
    models: AdurcModel[];
}