import { AdurcModelInclude } from './include';
import { AdurcModelUntyped } from './model';
import { AdurcModelSelect } from './select';
import { AdurcModelWhere } from './where';

export type AdurcDeleteArgs<T = AdurcModelUntyped> = {
    where?: AdurcModelWhere<T>;
    select?: AdurcModelSelect<T>;
    include?: AdurcModelInclude<T>;
};