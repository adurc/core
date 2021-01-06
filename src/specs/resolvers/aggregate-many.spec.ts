import MockDriver from '../mocks/mock-driver';
import { adurcUserModel, UserModel } from '../mocks/mock-user-model';
import { AdurcAggregateArgs } from '../../interfaces/client/aggregate.args';
import { AdurcBuilder } from '../../builder';
import { AdurcMockModels } from '../mocks/mock-models';
import { Adurc } from '../../interfaces/client';

describe('resolver aggregate tests', () => {

    let driver: MockDriver;
    let adurc: Adurc<AdurcMockModels>;

    beforeEach(async () => {
        const builder = new AdurcBuilder();
        builder.use(function (context) {
            context.addModel(adurcUserModel);
            context.addSource({
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

        await adurc.user.aggregate(args);

        expect(driver.aggregate).toHaveBeenCalledTimes(1);
        expect(driver.aggregate).toHaveBeenCalledWith(adurcUserModel, args);
    });

});