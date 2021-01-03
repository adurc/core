import { adurcUserModel, UserModel } from '../mocks/mock-user-model';
import { Adurc } from '../../adurc';
import { AdurcBuilder } from '../../builder';
import { AdurcMockModels } from '../mocks/mock-models';
import { MockBuilderGenerator } from '../mocks/generator-models';
import { AdurcDriver } from '../../interfaces/driver';
import { AdurcFindUniqueArgs } from '../../interfaces/client/find-first.args';

describe('resolver find unique tests', () => {
    let driver: AdurcDriver;
    let adurc: Adurc<AdurcMockModels>;

    beforeEach(async () => {
        const builder = new AdurcBuilder();
        builder.use(MockBuilderGenerator);
        adurc = await builder.build<AdurcMockModels>();
        driver = adurc.context.sources.find(x => x.name === 'mock').driver;
    });

    it('call driver find unique with single source', async () => {
        const args: AdurcFindUniqueArgs<UserModel> = {
            where: {
                id: 1,
            },
            select: {
                email: true
            }
        };

        driver.findMany = jest.fn(driver.findMany.bind(driver));

        await adurc.client.user.findUnique(args);

        expect(driver.findMany).toHaveBeenCalledTimes(1);
        expect(driver.findMany).toHaveBeenCalledWith(adurcUserModel, {
            take: 1,
            where: {
                id: 1,
            },
            select: {
                email: true
            }
        });
    });

});