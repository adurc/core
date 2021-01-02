import { AdurcIncludeArgs } from './include.args';
import { AdurcModelUntyped } from './model';
import { AdurcSelectArgs } from './select.args';
import { AdurcWhereArgs } from './where.args';

export type AdurcDeleteArgs<T = AdurcModelUntyped> =
    AdurcWhereArgs<T>
    & AdurcSelectArgs<T>
    & AdurcIncludeArgs<T>;