import { AdurcModel } from '../../interfaces/model';

export interface TagModel {
    id: number;
    name: string;
}

export const adurcTagModel: AdurcModel = {
    accessorName: 'tag',
    name: 'Tag',
    source: 'mock2',
    directives: [],
    fields: [
        { name: 'id', accessorName: 'id', type: 'int', nonNull: true, directives: [], collection: false, },
        { name: 'name', accessorName: 'name', type: 'string', nonNull: true, directives: [], collection: false, },
        { name: 'userId', accessorName: 'userId', type: 'int', nonNull: true, directives: [], collection: false, },
    ],
};