import { NonPrimitiveFields } from './common';
import { AdurcFindManyArgs } from './find-many.args';
import { AdurcModelSelect } from './select';

export type AdurcModelInclude<T, K extends keyof NonPrimitiveFields<T> = keyof NonPrimitiveFields<T>> = {
    [P in K]?: boolean | (
        T[P] extends Array<infer U>
        ? AdurcFindManyArgs<U>
        : AdurcModelSelect<T[P]>
    );
};