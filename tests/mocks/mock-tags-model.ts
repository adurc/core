import { AdurcModel } from '../../src/interfaces/model';

export interface TagModel {
    id: number;
    name: string;
}

export const adurcTagModel: AdurcModel = {
    name: 'Tag',
    source: 'mock2',
    directives: [],
    fields: [
        { name: 'id', type: 'int', nonNull: true, directives: [], collection: false, },
        { name: 'name', type: 'string', nonNull: true, directives: [], collection: false, },
    ],
};