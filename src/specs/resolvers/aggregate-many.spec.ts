import MockDriver from '../mocks/mock-driver';
import { adurcUserModel, UserModel } from '../mocks/mock-user-model';
import { AdurcAggregateArgs } from '../../interfaces/client/aggregate.args';
import { Adurc } from '../../adurc';
import { AdurcBuilder } from '../../builder';
import { AdurcMockModels } from '../mocks/mock-models';

describe('resolver aggregate tests', () => {

    let driver: MockDriver;
    let adurc: Adurc<AdurcMockModels>;

    beforeEach(async () => {
        const builder = new AdurcBuilder();
        builder.use(function (context) {
            context.models.push(adurcUserModel);
            context.sources.push({
                name: 'mock',
                driver: driver = new MockDriver()
            });
        });
        adurc = await builder.build<AdurcMockModels>();
    });

    it('call driver aggregate with single source', async () => {
        const args: AdurcAggregateArgs<UserModel> = {
            count: true,
        };

        driver.aggregate = jest.fn(driver.aggregate.bind(driver));

        await adurc.client.user.aggregate(args);

        expect(driver.aggregate).toHaveBeenCalledTimes(1);
        expect(driver.aggregate).toHaveBeenCalledWith(adurcUserModel, args);
    });

});