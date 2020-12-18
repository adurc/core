import findManyResolver from '../../src/resolvers/find-many.resolver';
import { ResolverContext } from '../../src/resolvers/resolver.context';
import { AdurcFindManyArgs } from '../../src/interfaces/client/find-many.args';
import mockDriver from '../mocks/mock-driver';
import { adurcUserModel, UserModel } from '../mocks/mock-user-model';

describe('resolver read tests', () => {

    it('call driver read with single source', async () => {
        const context: ResolverContext = {
            models: [adurcUserModel],
            sources: {
                mock: mockDriver,
            }
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