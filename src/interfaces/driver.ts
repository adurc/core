export interface IDriverCreateUpdateRes {
    returning?: Record<string, unknown>[];
    affectedRows?: number;
}

export type TDriverReadRes = Record<string, unknown>[];

export interface IDriverAggregateRes {
    aggregate: Record<string, unknown>;
}

export type TDriverDeleteRes = void;