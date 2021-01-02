import { AdurcIncludeArgs } from './include.args';
import { AdurcModelUntyped } from './model';
import { AdurcMutationData } from './mutation-data';
import { AdurcSelectArgs } from './select.args';


export type AdurcCreateArgs<T = AdurcModelUntyped> =
    AdurcSelectArgs<T>
    & AdurcIncludeArgs<T>
    & {
        data: Array<AdurcMutationData<T>>;
    };