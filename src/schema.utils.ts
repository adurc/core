import camelcase from 'camelcase';
import { AdurcModel, AdurcModelSchema } from './interfaces/model';

export class AdurcSchemaUtils {

    static convertModelSchemaToModel(model: AdurcModelSchema): AdurcModel {
        return {
            ...model,
            accessorName: camelcase(model.name),
            fields: model.fields.map(x => ({
                ...x,
                accessorName: camelcase(x.name),
            })),
        };
    }

}