import { PrimitiveType } from './common';
import { AdurcCreateRelationArgs } from './create-relation.args';
import { AdurcModelWhere } from './where';

export type AdurcUpdateArgs<T = unknown, K extends keyof T = keyof T> = {
    where?: AdurcModelWhere<T>;
    data: {
        [P in K]?: T[P] extends PrimitiveType ? T[P] : AdurcCreateRelationArgs<T[P]>
    };
};