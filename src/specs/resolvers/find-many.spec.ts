import { AdurcFindManyArgs } from '../../interfaces/client/find-many.args';
import MockDriver from '../mocks/mock-driver';
import { adurcUserModel, UserModel } from '../mocks/mock-user-model';
import { Adurc } from '../../adurc';
import { AdurcBuilder } from '../../builder';
import { AdurcMockModels } from '../mocks/mock-models';

describe('resolver find many tests', () => {
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

    it('call driver find many with single source', async () => {
        const args: AdurcFindManyArgs<UserModel> = {
            select: {
                email: true
            }
        };

        driver.findMany = jest.fn(driver.findMany.bind(driver));

        await adurc.client.user.findMany(args);

        expect(driver.findMany).toHaveBeenCalledTimes(1);
        expect(driver.findMany).toHaveBeenCalledWith(adurcUserModel, args);
    });

});