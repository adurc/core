import { AdurcObject, AdurcPrimitiveDefinition } from './common';

export interface AdurcDirective {
    provider: string;
    name: string;
    args: AdurcObject;
}

export interface AdurcModel {
    source: string;
    name: string;
    fields: AdurcField[];
    directives: AdurcDirective[];
}

export type AdurcFieldReferenceRelation = {
    parentField: string,
    childField: string,
}

export type AdurcFieldReference = {
    model: string,
    source: string,
    relation?: AdurcFieldReferenceRelation,
};

export interface AdurcField {
    name: string;
    type: AdurcPrimitiveDefinition | AdurcFieldReference;
    collection: boolean;
    nonNull: boolean;
    directives: AdurcDirective[];
}