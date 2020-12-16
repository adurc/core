import { AdurcDirectiveDefinition } from './interfaces/model';

export const primaryKeyDirective: AdurcDirectiveDefinition = {
    composition: 'field',
    name: 'pk',
    args: {
        generated: {
            value: 'boolean'
        }
    }
};

export const sourceDirective: AdurcDirectiveDefinition = {
    composition: 'model',
    name: 'source',
    args: { name: { value: 'string', nonNull: true } }
};

export const coreDirectives: AdurcDirectiveDefinition[] = [
    primaryKeyDirective,
    sourceDirective,
];