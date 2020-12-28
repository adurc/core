import { PrimitiveFields } from './common';
import { AdurcModelUntyped } from './model';

export type AdurcModelSelectTyped<T, K extends keyof PrimitiveFields<T> = keyof PrimitiveFields<T>> = {
    [P in K]?: boolean;
};

export type AdurcModelSelectUntyped = {
    [field: string]: boolean;
}

export type AdurcModelSelect<T = AdurcModelUntyped> = T extends AdurcModelUntyped ? AdurcModelSelectUntyped : AdurcModelSelectTyped<T>;