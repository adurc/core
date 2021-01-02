import MockDriver from '../mocks/mock-driver';
import { adurcUserModel, UserModel } from '../mocks/mock-user-model';
import { AdurcContext } from '../../interfaces/context';
import { AdurcDeleteArgs } from '../../interfaces/client/delete.args';
import deleteManyResolver from '../../resolvers/delete-many.resolver';

describe('resolver delete many tests', () => {

    it('call driver delete many with single source', async () => {
        const driver = new MockDriver('mock');
        const context: AdurcContext = {
            models: [adurcUserModel],
            directives: [],
            sources: [{
                name: 'mock',
                driver,
            }]
        };

        const args: AdurcDeleteArgs<UserModel> = {
            where: {
                id: 1
            },
            select: {
                email: true
            }
        };

        driver.deleteMany = jest.fn(driver.deleteMany.bind(driver));

        await deleteManyResolver(context, adurcUserModel, args as AdurcDeleteArgs);

        expect(driver.deleteMany).toHaveBeenCalledTimes(1);
        expect(driver.deleteMany).toHaveBeenCalledWith(adurcUserModel, args);
    });

});