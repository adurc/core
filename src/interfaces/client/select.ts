import { PrimitiveFields } from './common';
import { AdurcModelUntyped } from './model';

export type AdurcModelSelectTyped<T, K extends keyof PrimitiveFields<T> = keyof PrimitiveFields<T>> = {
    [P in K]?: true;
};

export type AdurcModelSelectUntyped = {
    [field: string]: true;
}

export type AdurcModelSelect<T = AdurcModelUntyped> = T extends AdurcModelUntyped ? AdurcModelSelectUntyped : AdurcModelSelectTyped<T>;