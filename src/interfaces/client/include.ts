import { NonPrimitiveFields } from './common';
import { AdurcReadProjection } from './read';

export type AdurcModelInclude<T, K extends keyof NonPrimitiveFields<T> = keyof NonPrimitiveFields<T>> = {
    [P in K]?: boolean | (
        T[P] extends Array<infer U>
        ? AdurcReadProjection<U>
        : T[P]
    );
};