import { AdurcIncludeArgs } from './include.args';
import { AdurcModelUntyped } from './model';
import { AdurcMutationData } from './mutation-data';
import { AdurcSelectArgs } from './select.args';
import { AdurcWhereArgs } from './where.args';

export type AdurcUpdateArgs<T = AdurcModelUntyped> =
    AdurcWhereArgs<T>
    & AdurcSelectArgs<T>
    & AdurcIncludeArgs<T>
    & {
        set: AdurcMutationData<T>;
    };