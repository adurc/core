export type BatchResult<T = unknown> = {
    count: number;
    returning?: T[];
};