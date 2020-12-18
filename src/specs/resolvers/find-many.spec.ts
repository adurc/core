import findManyResolver from '../../resolvers/find-many.resolver';
import { AdurcFindManyArgs } from '../../interfaces/client/find-many.args';
import mockDriver from '../mocks/mock-driver';
import { adurcUserModel, UserModel } from '../mocks/mock-user-model';
import { AdurcContext } from '../../interfaces/context';

describe('resolver find many tests', () => {

    it('call driver find many with single source', async () => {
        const context: AdurcContext = {
            models: [adurcUserModel],
            directives: [],
            sources: [{
                name: 'mock',
                driver: mockDriver,
            }]
        };

        const args: AdurcFindManyArgs<UserModel> = {
            select: {
                email: true
            }
        };

        mockDriver.findMany = jest.fn(mockDriver.findMany.bind(mockDriver));

        await findManyResolver(context, adurcUserModel, args);

        expect(mockDriver.findMany).toHaveBeenCalledTimes(1);
        expect(mockDriver.findMany).toHaveBeenCalledWith(args);
    });

});