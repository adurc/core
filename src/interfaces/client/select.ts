import { PrimitiveFields } from './common';

export type AdurcModelSelect<T, K extends keyof PrimitiveFields<T> = keyof PrimitiveFields<T>> = { [P in K]?: boolean };