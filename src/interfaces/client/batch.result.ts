import { AdurcModelUntyped } from './model';

export type BatchResult<T = AdurcModelUntyped> = {
    count: number;
    returning?: T[];
};