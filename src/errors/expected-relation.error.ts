import { AdurcField, AdurcModel } from '../interfaces/model';
import { AdurcExecutionError } from './execution.error';

export class AdurcExpectedRelationError extends AdurcExecutionError {
    constructor(
        public sourceModel: AdurcModel,
        public sourceField: AdurcField,
    ) {
        super(`Expected relation spec on model ${sourceModel.name} and field: ${sourceField.name}`);
    }
}