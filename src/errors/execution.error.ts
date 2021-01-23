import { AdurcBaseError } from './base.error';

export class AdurcExecutionError extends AdurcBaseError<'execution'> {

    get pipeline(): 'execution' {
        return 'execution';
    }

}