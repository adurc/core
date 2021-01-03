import { AdurcModelUntyped } from './model';
import { AdurcModelSelect } from './select';

export type AdurcSelectArgs<T = AdurcModelUntyped> = {
    select: AdurcModelSelect<T>;
};