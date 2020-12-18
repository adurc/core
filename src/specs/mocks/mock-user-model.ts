import { AdurcModel } from '../../interfaces/model';
import { PostModel } from './mock-post-model';
import { ProfileModel } from './mock-profile-model';

export interface UserModel {
    id: number;
    email: string;
    name?: string;
    posts: PostModel[];
    profile: ProfileModel;
    age: number;
}

export const adurcUserModel: AdurcModel = {
    name: 'User',
    source: 'mock',
    directives: [],
    fields: [
        { name: 'id', type: 'int', nonNull: true, directives: [], collection: false, },
        { name: 'name', type: 'string', nonNull: true, directives: [], collection: false, },
        { name: 'email', type: 'string', nonNull: true, directives: [], collection: false, },
        { name: 'age', type: 'int', nonNull: true, directives: [], collection: false, },
        { name: 'posts', type: { model: 'Post', source: 'mock' }, nonNull: true, directives: [], collection: true, },
        { name: 'profile', type: { model: 'Profile', source: 'mock' }, nonNull: false, directives: [], collection: false, },
    ],
};