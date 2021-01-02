import MockDriver from '../mocks/mock-driver';
import { adurcUserModel, UserModel } from '../mocks/mock-user-model';
import { AdurcContext } from '../../interfaces/context';
import { AdurcAggregateArgs } from '../../interfaces/client/aggregate.args';
import aggregateResolver from '../../resolvers/aggregate.resolver';

describe('resolver aggregate tests', () => {

    it('call driver aggregate with single source', async () => {
        const driver = new MockDriver('mock');
        const context: AdurcContext = {
            models: [adurcUserModel],
            directives: [],
            sources: [{
                name: 'mock',
                driver,
            }]
        };

        const args: AdurcAggregateArgs<UserModel> = {
            count: true,
        };

        driver.aggregate = jest.fn(driver.aggregate.bind(driver));

        await aggregateResolver(context, adurcUserModel, args as AdurcAggregateArgs);

        expect(driver.aggregate).toHaveBeenCalledTimes(1);
        expect(driver.aggregate).toHaveBeenCalledWith(adurcUserModel, args);
    });

});