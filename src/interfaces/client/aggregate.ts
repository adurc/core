
export type PickNumber<T> = Pick<T, {
    [K in keyof T]: T[K] extends number ? K : never
}[keyof T]>;


export type AggregateNumber<T, K extends keyof PickNumber<T> = keyof PickNumber<T>> = { [P in K]?: boolean };

export type AdurcAggregateProjection<T = unknown> = {
    avg?: AggregateNumber<T>;
    sum?: AggregateNumber<T>;
    min?: AggregateNumber<T>;
    max?: AggregateNumber<T>;
};