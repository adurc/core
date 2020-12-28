import { PrimitiveType } from './common';
import { AdurcModelUntyped } from './model';
import { AdurcModelWhere, AdurcModelWhereUntyped } from './where';

export type AdurcMutationDataRelationArgsTyped<T, K extends keyof T = keyof T> = {
    connect?: { [P in K]?: T[P] }
    create?: { [P in K]?: T[P] }
    update?: { [P in K]?: T[P] }
    upsert?: { [P in K]?: T[P] }
    delete?: { [P in K]?: T[P] }
    disconnect?: { [P in K]?: T[P] }
    connectOrCreate?: {
        where: AdurcModelWhere<T>;
        create: { [P in K]?: T[P] };
    }
}


export type AdurcCreateRelationArgsUntyped = {
    connect?: { [field: string]: PrimitiveType }
    create?: { [field: string]: PrimitiveType }
    update?: { [field: string]: PrimitiveType }
    upsert?: { [field: string]: PrimitiveType }
    delete?: { [field: string]: PrimitiveType }
    disconnect?: { [field: string]: PrimitiveType }
    connectOrCreate?: {
        where: AdurcModelWhereUntyped;
        create: { [field: string]: PrimitiveType };
    }
}

export type AdurcMutationDataRelationArgs<T = AdurcModelUntyped> = T extends AdurcModelUntyped ? AdurcCreateRelationArgsUntyped : AdurcMutationDataRelationArgsTyped<T>;

export type AdurcMutationDataRelationEnumerableArgsTyped<T, K extends keyof T = keyof T> = {
    connect?: { [P in K]?: T[P] }[];
    create?: { [P in K]?: T[P] }[];
}

export type AdurcCreateRelationEnumerableArgsUntyped = {
    connect?: { [field: string]: PrimitiveType }[];
    create?: { [field: string]: PrimitiveType }[];
}

export type AdurcMutationDataRelationEnumerableArgs<T = AdurcModelUntyped> = T extends AdurcModelUntyped ? AdurcCreateRelationEnumerableArgsUntyped : AdurcMutationDataRelationEnumerableArgsTyped<T>;

export type AdurcMutationDataTyped<T, K extends keyof T = keyof T> = {
    [P in K]?: T[P] extends Array<infer U>
    ? (U extends PrimitiveType ? T[P] : AdurcMutationDataRelationEnumerableArgs<U>)
    : (T[P] extends PrimitiveType ? T[P] : AdurcMutationDataRelationArgs<T[P]>)
};

export type AdurcMutationDataUntyped = { [field: string]: PrimitiveType | AdurcMutationDataRelationEnumerableArgs | AdurcMutationDataRelationArgs };

export type AdurcMutationData<T> = T extends AdurcModelUntyped ? AdurcMutationDataUntyped : AdurcMutationDataTyped<T>;
