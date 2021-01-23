import { BuilderStage } from '../interfaces/builder.generator';
import { AdurcBuildError } from './build.error';

export class AdurcInvalidSetPreviousStageError extends AdurcBuildError {

    constructor(
        public fromStage: BuilderStage,
        public toStage: BuilderStage,
    ) {
        super(`You can not set stage ${toStage} before to ${fromStage}`);
    }

}