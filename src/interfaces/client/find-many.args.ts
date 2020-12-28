import { AdurcModelInclude } from './include';
import { AdurcModelUntyped } from './model';
import { AdurcModelSelect } from './select';
import { AdurcModelOrderBy } from './sort';
import { AdurcModelWhere } from './where';

export type AdurcFindManyArgs<T = AdurcModelUntyped> = {
    select?: AdurcModelSelect<T>;
    include?: AdurcModelInclude<T>;
    where?: AdurcModelWhere<T>;
    orderBy?: AdurcModelOrderBy<T>;
    take?: number;
    skip?: number;
};
