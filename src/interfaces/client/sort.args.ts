import { AdurcModelUntyped } from './model';
import { AdurcModelOrderBy } from './sort';

export type AdurcOrderArgs<T = AdurcModelUntyped> = {
    order?: AdurcModelOrderBy<T>;
};