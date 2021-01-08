import MockDriver from '../mocks/mock-driver';
import { adurcUserModel, UserModel } from '../mocks/mock-user-model';
import { AdurcUpdateArgs } from '../../interfaces/client/update.args';
import { AdurcBuilder } from '../../builder';
import { AdurcMockModels } from '../mocks/mock-models';
import { Adurc } from '../../interfaces/client';

describe('resolver update many tests', () => {

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

    it('call driver update many with single source', async () => {
        const args: AdurcUpdateArgs<UserModel> = {
            where: {},
            set: {
                name: 'New Name'
            },
            select: {
                email: true
            }
        };

        driver.updateMany = jest.fn(driver.updateMany.bind(driver));

        await adurc.client.user.updateMany(args);

        expect(driver.updateMany).toHaveBeenCalledTimes(1);
        expect(driver.updateMany).toHaveBeenCalledWith(adurcUserModel, args);
    });

});