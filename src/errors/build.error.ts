import { AdurcBaseError } from './base.error';

export class AdurcBuildError extends AdurcBaseError<'build'> {

    get pipeline(): 'build' {
        return 'build';
    }

}