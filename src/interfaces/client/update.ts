import { PrimitiveType } from './common';
import { AdurcCreateProjectionRelation } from './create';
import { AdurcModelWhere } from './where';

export type AdurcUpdateProjection<T = unknown, K extends keyof T = keyof T> = {
    where?: AdurcModelWhere<T>;
    data: {
        [P in K]?: T[P] extends PrimitiveType ? T[P] : AdurcCreateProjectionRelation<T[P]>
    };
};