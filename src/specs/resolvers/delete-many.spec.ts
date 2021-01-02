import { Adurc } from '../../adurc';
import { AdurcBuilder } from '../../builder';
import { AdurcDeleteArgs } from '../../interfaces/client/delete.args';
import MockDriver from '../mocks/mock-driver';
import { AdurcMockModels } from '../mocks/mock-models';
import { adurcUserModel, UserModel } from '../mocks/mock-user-model';

describe('resolver delete many tests', () => {

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

    it('call driver delete many with single source', async () => {
        const args: AdurcDeleteArgs<UserModel> = {
            where: {
                id: 1,
            },
            select: {
                email: true
            }
        };

        driver.deleteMany = jest.fn(driver.deleteMany.bind(driver));

        await adurc.client.user.deleteMany(args);

        expect(driver.deleteMany).toHaveBeenCalledTimes(1);
        expect(driver.deleteMany).toHaveBeenCalledWith(adurcUserModel, args);
    });

});