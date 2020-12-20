import { AdurcObject, AdurcPrimitiveDefinition } from './common';

export type AdurcValueDefinition = AdurcPrimitiveDefinition | AdurcObject<AdurcPrimitiveDefinition>;

export type AdurcDirectiveArgDefinition = ({
    type: AdurcPrimitiveDefinition | AdurcObject<AdurcDirectiveArgDefinition>;
} | {
    type: 'enum';
    options: string[];
}) & {
    nonNull?: boolean;
};

export interface AdurcDirectiveDefinition {
    provider: string;
    composition: 'model' | 'field';
    name: string;
    repeatable?: boolean;
    description?: string;
    args?: AdurcObject<AdurcDirectiveArgDefinition>;
}
