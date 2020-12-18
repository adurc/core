import { PrimitiveType } from './common';

export type AdurcModelWhereRelation<T> = {
    every?: AdurcModelWhere<T>;
    some?: AdurcModelWhere<T>;
    none?: AdurcModelWhere<T>;
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

export type AdurcModelWherePrimitive<T extends PrimitiveType> = (T extends string ? string | AdurcModelWhereString : T)
    | (T extends number ? number | AdurcModelWhereInt : T)
    | (T extends boolean ? boolean | AdurcModelWhereBoolean : T)
    | (T extends Date ? Date | AdurcModelWhereDate : T);


export type AdurcModelWhereSelector<T> = T extends PrimitiveType
    ? AdurcModelWherePrimitive<T>
    : T extends Array<infer U>
    ? AdurcModelWhereRelation<U>
    : AdurcModelWhere<T>;

export type AdurcModelWhere<T, K extends keyof T = keyof T> = {
    [P in K]?: AdurcModelWhereSelector<T[P]>
};