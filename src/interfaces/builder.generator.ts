import { AdurcSchemaBuilder } from '../schema.builder';

export enum BuilderStage {
    OnInit = 1,
    OnAfterInit = 2,
}

export type BuilderGenerator = Generator<BuilderStage, void> | AsyncGenerator<BuilderStage, void>;

export type BuilderGeneratorFunction = (builder: AdurcSchemaBuilder) => BuilderGenerator | void | Promise<void>;