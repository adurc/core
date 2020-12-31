import { AdurcModelInclude } from './include';
import { AdurcModelUntyped } from './model';
import { AdurcMutationData } from './mutation-data';
import { AdurcModelSelect } from './select';
import { AdurcModelWhere } from './where';

export type AdurcUpdateArgs<T = AdurcModelUntyped> = {
    where?: AdurcModelWhere<T>;
    select?: AdurcModelSelect<T>;
    include?: AdurcModelInclude<T>;
    set: AdurcMutationData<T>;
};