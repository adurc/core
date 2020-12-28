import { PrimitiveType } from './common';
import { AdurcCreateRelationArgs, AdurcCreateRelationEnumerableArgs } from './create-relation.args';
import { AdurcModelInclude } from './include';
import { AdurcModelUntyped } from './model';
import { AdurcModelSelect } from './select';

export type AdurcCreateArgs<T = AdurcModelUntyped, K extends keyof T = keyof T> = {
    select?: AdurcModelSelect<T>;
    include?: AdurcModelInclude<T>;
    data: Array<{
        // [P in K]?: T[P] extends PrimitiveType ? T[P] : AdurcCreateRelationArgs<T[P]>
        [P in K]?: T[P] extends Array<infer U>
        ? (U extends PrimitiveType ? T[P] : AdurcCreateRelationEnumerableArgs<U>)
        : (T[P] extends PrimitiveType ? T[P] : AdurcCreateRelationArgs<T[P]>)
    }>;
};