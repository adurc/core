import { AdurcModelWhere } from './where';

export type AdurcCreateRelationArgs<T, K extends keyof T = keyof T> = {
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

export type AdurcCreateRelationEnumerableArgs<T, K extends keyof T = keyof T> = {
    connect?: { [P in K]?: T[P] }[];
    create?: { [P in K]?: T[P] }[];
}