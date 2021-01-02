import { AdurcContextBuilder } from './context';

export enum BuilderStage {
    OnInit = 1,
    OnAfterInit = 2,
}

export type BuilderGenerator = AsyncGenerator<BuilderStage, void>;

export type BuilderGeneratorFunction = (builder: AdurcContextBuilder) => BuilderGenerator | void | Promise<void>;