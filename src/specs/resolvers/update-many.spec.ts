import MockDriver from '../mocks/mock-driver';
import { adurcUserModel, UserModel } from '../mocks/mock-user-model';
import { AdurcContext } from '../../interfaces/context';
import { AdurcUpdateArgs } from '../../interfaces/client/update.args';
import updateManyResolver from '../../resolvers/update.resolver';

describe('resolver update many tests', () => {

    it('call driver update many with single source', async () => {
        const driver = new MockDriver('mock');
        const context: AdurcContext = {
            models: [adurcUserModel],
            directives: [],
            sources: [{
                name: 'mock',
                driver,
            }]
        };

        const args: AdurcUpdateArgs<UserModel> = {
            set: {
                name: 'New Name'
            },
            select: {
                email: true
            }
        };

        driver.updateMany = jest.fn(driver.updateMany.bind(driver));

        await updateManyResolver(context, adurcUserModel, args as AdurcUpdateArgs);

        expect(driver.updateMany).toHaveBeenCalledTimes(1);
        expect(driver.updateMany).toHaveBeenCalledWith(adurcUserModel, args);
    });

});