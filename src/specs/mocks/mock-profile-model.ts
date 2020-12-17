import { AdurcModel } from '../../interfaces/model';
import { UserModel } from './mock-user-model';

export interface ProfileModel {
    id: number;
    bio: string;
    userId: number;
    user: UserModel;
}

export const adurcProfileModel: AdurcModel = {
    name: 'Profile',
    source: 'mock',
    directives: [],
    fields: [
        { name: 'id', type: 'int', nonNull: true, directives: [], collection: false, },
        { name: 'bio', type: 'string', nonNull: true, directives: [], collection: false, },
        { name: 'userId', type: 'int', nonNull: true, directives: [], collection: false, },
        { name: 'user', type: { model: 'User', source: 'mock' }, nonNull: true, directives: [], collection: false, },
    ],
};