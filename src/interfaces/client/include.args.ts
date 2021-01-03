import { AdurcModelInclude } from './include';
import { AdurcModelUntyped } from './model';

export type AdurcIncludeArgs<T = AdurcModelUntyped> = {
    include: AdurcModelInclude<T>;
};