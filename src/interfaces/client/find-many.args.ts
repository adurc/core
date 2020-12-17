import { AdurcModelInclude } from './include';
import { AdurcModelSelect } from './select';
import { AdurcModelOrderBy } from './sort';
import { AdurcModelWhere } from './where';

export type AdurcFindManyArgs<T = unknown> = {
    select?: AdurcModelSelect<T>;
    include?: AdurcModelInclude<T>;
    where?: AdurcModelWhere<T>;
    orderBy?: AdurcModelOrderBy<T>;
    take?: number;
    skip?: number;
};
