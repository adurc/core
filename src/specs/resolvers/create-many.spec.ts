import MockDriver from '../mocks/mock-driver';
import { adurcUserModel, UserModel } from '../mocks/mock-user-model';
import { AdurcContext } from '../../interfaces/context';
import { AdurcCreateArgs } from '../../interfaces/client/create.args';
import createManyResolver from '../../resolvers/create-many.resolver';

describe('resolver create many tests', () => {

    it('call driver create many with single source', async () => {
        const driver = new MockDriver('mock');
        const context: AdurcContext = {
            models: [adurcUserModel],
            directives: [],
            sources: [{
                name: 'mock',
                driver,
            }]
        };

        const args: AdurcCreateArgs<UserModel> = {
            data: [
                { name: 'New user' }
            ],
            select: {
                email: true
            }
        };

        driver.createMany = jest.fn(driver.createMany.bind(driver));

        await createManyResolver(context, adurcUserModel, args as AdurcCreateArgs);

        expect(driver.createMany).toHaveBeenCalledTimes(1);
        expect(driver.createMany).toHaveBeenCalledWith(adurcUserModel, args);
    });

});