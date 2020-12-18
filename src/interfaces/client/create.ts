import { PrimitiveType } from './common';
import { AdurcModelWhere } from './where';

export type AdurcCreateProjectionRelation<T, K extends keyof T = keyof T> = {
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

export type AdurcCreateProjection<T = unknown, K extends keyof T = keyof T> = {
    data: Array<{
        [P in K]?: T[P] extends PrimitiveType ? T[P] : AdurcCreateProjectionRelation<T[P]>
    }>;
};