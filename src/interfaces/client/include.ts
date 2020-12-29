import { NonPrimitiveFields } from './common';
import { AdurcFindManyArgs } from './find-many.args';
import { AdurcModelUntyped } from './model';
import { AdurcModelSelect } from './select';

export type AdurcModelIncludeTyped<T, K extends keyof NonPrimitiveFields<T> = keyof NonPrimitiveFields<T>> = {
    [P in K]?: true | (
        T[P] extends Array<infer U>
        ? AdurcFindManyArgs<U>
        : AdurcModelSelect<T[P]>
    );
};

export type AdrucModelIncludeUntyped = {
    [field: string]: true | AdurcFindManyArgs | AdurcModelSelect;
}

export type AdurcModelInclude<T> = T extends AdurcModelUntyped ? AdrucModelIncludeUntyped : AdurcModelIncludeTyped<T>;