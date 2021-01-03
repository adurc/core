import { AdurcModelUntyped } from './model';
import { AdurcModelOrderBy } from './sort';

export type AdurcOrderArgs<T = AdurcModelUntyped> = {
    orderBy: AdurcModelOrderBy<T>;
};