import { AdurcDirectiveDefinition } from '../interfaces/directive-definition';
import { AdurcDirective, AdurcModel } from '../interfaces/model';
import { AdurcSchemaBuilder } from '../schema.builder';
import { AdurcBuildError } from './build.error';

export abstract class AdurcBuildValidationError {
    constructor(public readonly message: string) {

    }
}

export class AdurcUnknownModelSourceBuildValidationError extends AdurcBuildValidationError {
    constructor(model: AdurcModel) {
        super(`Source '${model.source}' specified in model '${model.name}' not registered in context`);
    }
}

export class AdurcUnknownModelDirectiveBuildValidationError extends AdurcBuildValidationError {
    constructor(model: AdurcModel, directive: AdurcDirective) {
        super(`Model ${model.name} has unknown directive ${directive.name} of provider ${directive.provider}`);
    }
}

export class AdurcModelDirectiveCompositionRestrictionValidationError extends AdurcBuildValidationError {
    constructor(model: AdurcModel, directive: AdurcDirective, definition: AdurcDirectiveDefinition) {
        super(`Model ${model.name} has directive ${directive.name} of provider ${directive.provider} on model, but this is restricted to ${definition.composition}`);
    }
}

export class AdurcValidationContextError extends AdurcBuildError {

    constructor(
        public readonly context: AdurcSchemaBuilder,
        public readonly validationErrors: AdurcBuildValidationError[],
    ) {
        super('An error ocurred validating context:\n' + validationErrors.map(x => ' - ' + x.toString()).join('\n'));
    }
}