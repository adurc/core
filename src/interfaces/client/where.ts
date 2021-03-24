import { PrimitiveType } from './common';

export type SpecialWhereKeys = 'AND' | 'OR' | 'NOT';

export type AdurcModelWhereRelationTyped<T> = {
    every?: AdurcModelWhereTyped<T>;
    some?: AdurcModelWhereTyped<T>;
    none?: AdurcModelWhereTyped<T>;
};

export type AdurcModelWhereRelationUntyped = {
    every?: AdurcModelWhereUntyped;
    some?: AdurcModelWhereUntyped;
    none?: AdurcModelWhereUntyped;
};

export type AdurcModelWhereString = {
    equals?: string | null;
    not?: string | AdurcModelWhereString | null;
    in?: string[];
    notIn?: string[];
    lt?: string;
    lte?: string;
    gt?: string;
    gte?: string;
    contains?: string;
    startsWith?: string;
    endsWith?: string;
};

export type AdurcModelWhereInt = {
    equals?: number | null;
    not?: number | AdurcModelWhereInt | null;
    in?: number[];
    notIn?: number[];
    lt?: number;
    lte?: number;
    gt?: number;
    gte?: number;
};

export type AdurcModelWhereBoolean = {
    equals?: boolean | null;
    not?: boolean | AdurcModelWhereBoolean | null;
};

export type AdurcModelWhereDate = {
    equals?: Date | null;
    not?: Date | AdurcModelWhereDate | null;
    in?: Date[];
    notIn?: Date[];
    lt?: Date;
    lte?: Date;
    gt?: Date;
    gte?: Date;
};

export type AdurcModelWherePrimitive<T extends PrimitiveType> =
    (T extends string ? string | AdurcModelWhereString : T)
    | (T extends number ? number | AdurcModelWhereInt : T)
    | (T extends boolean ? boolean | AdurcModelWhereBoolean : T)
    | (T extends Date ? Date | AdurcModelWhereDate : T);


export type AdurcModelWhereSelector<T> = T extends PrimitiveType
    ? AdurcModelWherePrimitive<T>
    : T extends Array<infer U>
    ? AdurcModelWhereRelationTyped<U>
    : AdurcModelWhereTyped<T>;

export type AdurcModelWhereTyped<T, K extends keyof T = keyof T> = {
    [P in K]?: AdurcModelWhereSelector<T[P]>
} & {
    AND?: AdurcModelWhereTyped<T>[];
    OR?: AdurcModelWhereTyped<T>[];
    NOT?: AdurcModelWhereTyped<T>[];
}

export type AdurcModelWhereUntyped = (
    {
        AND?: AdurcModelWhereUntyped[];
        OR?: AdurcModelWhereUntyped[];
        NOT?: AdurcModelWhereUntyped[];

        [field: string]: string | AdurcModelWhereString
        | number | AdurcModelWhereInt
        | boolean | AdurcModelWhereBoolean
        | Date | AdurcModelWhereDate
        | AdurcModelWhereUntyped | AdurcModelWhereRelationUntyped
        | AdurcModelWhereUntyped[];
    }
)

export type AdurcModelWhere<T> = T extends Record<string, unknown> ? AdurcModelWhereUntyped : AdurcModelWhereTyped<T>;