import { AdurcObject, AdurcPrimitiveDefinition } from './common';

export interface AdurcDirective {
    provider: string;
    name: string;
    args: AdurcObject;
}


export interface AdurcDirectiveReference {
    provider: string;
    name: string;
}

export interface AdurcModel {
    source: string;
    name: string;
    accessorName: string;
    fields: AdurcField[];
    directives: AdurcDirective[];
}

export interface AdurcModelReference {
    source: string;
    name: string;
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
    accessorName: string;
    type: AdurcPrimitiveDefinition | AdurcFieldReference;
    nonNull: boolean;
    collection: boolean;
    directives: AdurcDirective[];
}

export type AdurcModelSchema = Omit<AdurcModel, 'accessorName' | 'fields'> & { fields: Omit<AdurcField, 'accessorName'>[] };