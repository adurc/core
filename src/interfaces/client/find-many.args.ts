import { AdurcIncludeArgs } from './include.args';
import { AdurcModelUntyped } from './model';
import { AdurcPaginationArgs } from './pagination.args';
import { AdurcSelectArgs } from './select.args';
import { AdurcOrderArgs } from './sort.args';
import { AdurcWhereArgs } from './where.args';

export type AdurcFindManyArgs<T = AdurcModelUntyped> =
    Partial<AdurcSelectArgs<T>>
    & Partial<AdurcIncludeArgs<T>>
    & Partial<AdurcWhereArgs<T>>
    & Partial<AdurcOrderArgs<T>>
    & Partial<AdurcPaginationArgs>;
