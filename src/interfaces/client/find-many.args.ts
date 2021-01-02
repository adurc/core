import { AdurcIncludeArgs } from './include.args';
import { AdurcModelUntyped } from './model';
import { AdurcPaginationArgs } from './pagination.args';
import { AdurcSelectArgs } from './select.args';
import { AdurcOrderArgs } from './sort.args';
import { AdurcWhereArgs } from './where.args';

export type AdurcFindManyArgs<T = AdurcModelUntyped> =
    AdurcSelectArgs<T>
    & AdurcIncludeArgs<T>
    & AdurcWhereArgs<T>
    & AdurcOrderArgs<T>
    & AdurcPaginationArgs;
