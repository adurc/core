import readResolver from '../../src/resolvers/read.resolver';
import { ResolverContext } from '../../src/resolvers/resolver.context';
import { AdurcReadProjection } from '../../src/interfaces/client/read';
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

        const projection: AdurcReadProjection<UserModel> = {
            select: {
                email: true
            }
        };

        mockDriver.read = jest.fn(mockDriver.read.bind(mockDriver));

        await readResolver(context, adurcUserModel, projection);

        expect(mockDriver.read).toHaveBeenCalledTimes(1);
        expect(mockDriver.read).toHaveBeenCalledWith(projection);
    });

});