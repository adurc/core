export type PrimitiveType = string | number | Date | boolean | Buffer;

export type NumberFields<T> = Pick<T, {
    [K in keyof T]: T[K] extends number ? K : never
}[keyof T]>;


export type ArrayFields<T> = Pick<T, {
    [K in keyof T]: T[K] extends Array<unknown> ? K : never
}[keyof T]>;

export type PrimitiveFields<T> = Pick<T, {
    [K in keyof T]: T[K] extends PrimitiveType ? K : never
}[keyof T]>;

export type NonPrimitiveFields<T> = Pick<T, {
    [K in keyof T]: T[K] extends PrimitiveType ? never : K
}[keyof T]>;