import MockDriver from '../mocks/mock-driver';
import { adurcUserModel, UserModel } from '../mocks/mock-user-model';
import { AdurcCreateArgs } from '../../interfaces/client/create.args';
import { AdurcMockModels } from '../mocks/mock-models';
import { AdurcBuilder } from '../../builder';
import { Adurc } from '../../interfaces/client';

describe('resolver create many tests', () => {

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

    it('call driver create many with single source', async () => {
        const args: AdurcCreateArgs<UserModel> = {
            data: [{ name: 'test' }],
            select: {
                email: true
            }
        };

        driver.createMany = jest.fn(driver.createMany.bind(driver));

        await adurc.user.createMany(args);

        expect(driver.createMany).toHaveBeenCalledTimes(1);
        expect(driver.createMany).toHaveBeenCalledWith(adurcUserModel, args);
    });
    
});