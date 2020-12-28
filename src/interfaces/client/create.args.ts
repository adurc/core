import { AdurcModelInclude } from './include';
import { AdurcModelUntyped } from './model';
import { AdurcMutationData } from './mutation-data';
import { AdurcModelSelect } from './select';


export type AdurcCreateArgs<T = AdurcModelUntyped> = {
    select?: AdurcModelSelect<T>;
    include?: AdurcModelInclude<T>;
    data: Array<AdurcMutationData<T>>;
};