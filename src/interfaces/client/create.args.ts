import { PrimitiveType } from './common';
import { AdurcCreateRelationArgs } from './create-relation.args';

export type AdurcCreateArgs<T = unknown, K extends keyof T = keyof T> = {
    data: Array<{
        [P in K]?: T[P] extends PrimitiveType ? T[P] : AdurcCreateRelationArgs<T[P]>
    }>;
};