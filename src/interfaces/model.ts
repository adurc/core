export type AdurcPrimitiveDefinition = 'id' | 'string' | 'int' | 'uuid' | 'float' | 'boolean' | 'date' | 'buffer';
export type AdurcValueDefinition = AdurcPrimitiveDefinition | AdurcObject<AdurcPrimitiveDefinition>;

export type AdurcPrimitive = string | number | boolean;
export type AdurcValue = AdurcPrimitive | AdurcObject<unknown> | AdurcValue[];
export type AdurcObject<T = unknown> = { [property: string]: T };

export type AdurcDirectiveArgDefinition = ({
    value: AdurcPrimitiveDefinition | AdurcObject<AdurcDirectiveArgDefinition>;
} | {
    value: 'enum';
    options: string[];
}) & {
    nonNull?: boolean;
};

export interface AdurcDirectiveDefinition {
    composition: 'model' | 'field';
    name: string;
    repeatable?: boolean;
    description?: string;
    args?: AdurcObject<AdurcDirectiveArgDefinition>;
}

export interface AdurcDirective {
    name: string;
    args: AdurcObject;
}

export interface AdurcModel {
    name: string;
    fields: AdurcField[];
    directives: AdurcDirective[];
}

export interface AdurcField {
    name: string;
    type: string;
    collection: boolean;
    nonNull: boolean;
    directives: AdurcDirective[];
}