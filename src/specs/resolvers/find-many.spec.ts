import findManyResolver from '../../resolvers/find-many.resolver';
import { AdurcFindManyArgs } from '../../interfaces/client/find-many.args';
import MockDriver from '../mocks/mock-driver';
import { adurcUserModel, UserModel } from '../mocks/mock-user-model';
import { AdurcContext } from '../../interfaces/context';

describe('resolver find many tests', () => {

    it('call driver find many with single source', async () => {
        const driver = new MockDriver('mock');
        const context: AdurcContext = {
            models: [adurcUserModel],
            directives: [],
            sources: [{
                name: 'mock',
                driver,
            }]
        };

        const args: AdurcFindManyArgs<UserModel> = {
            select: {
                email: true
            }
        };

        driver.findMany = jest.fn(driver.findMany.bind(driver));

        await findManyResolver(context, adurcUserModel, args);

        expect(driver.findMany).toHaveBeenCalledTimes(1);
        expect(driver.findMany).toHaveBeenCalledWith(args);
    });

});