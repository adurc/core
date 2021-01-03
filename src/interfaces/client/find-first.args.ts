import { AdurcIncludeArgs } from './include.args';
import { AdurcModelUntyped } from './model';
import { AdurcSelectArgs } from './select.args';
import { AdurcWhereArgs } from './where.args';

export type AdurcFindUniqueArgs<T = AdurcModelUntyped> =
    Partial<AdurcSelectArgs<T>>
    & Partial<AdurcIncludeArgs<T>>
    & AdurcWhereArgs<T>