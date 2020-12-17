import { AdurcModel } from '../../interfaces/model';
import { TagModel } from './mock-tags-model';
import { UserModel } from './mock-user-model';

export interface PostModel {
    id: number;
    title: string;
    content?: string;
    published: boolean;
    authorId?: number;
    author?: UserModel;
    tags: TagModel[];
}

export const adurcPostModel: AdurcModel = {
    name: 'Post',
    source: 'mock',
    directives: [],
    fields: [
        { name: 'id', type: 'int', nonNull: true, directives: [], collection: false, },
        { name: 'title', type: 'string', nonNull: true, directives: [], collection: false, },
        { name: 'content', type: 'string', nonNull: false, directives: [], collection: false, },
        { name: 'published', type: 'boolean', nonNull: true, directives: [], collection: false, },
        { name: 'authorId', type: 'int', nonNull: false, directives: [], collection: false, },
        { name: 'author', type: { model: 'User', source: 'mock' }, nonNull: false, directives: [], collection: false, },
        { name: 'tags', type: { model: 'Tag', source: 'mock2' }, nonNull: false, directives: [], collection: true, },
    ],
};