import { AdurcExecutionError } from './execution.error';

export class AdurcUnknownSourceError extends AdurcExecutionError {
    constructor(public unknownSource: string) {
        super(`Unknown source ${unknownSource}`);
    }
}