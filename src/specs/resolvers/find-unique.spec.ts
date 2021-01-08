import { adurcUserModel, UserModel } from '../mocks/mock-user-model';
import { AdurcBuilder } from '../../builder';
import { AdurcMockModels } from '../mocks/mock-models';
import { MockBuilderGenerator } from '../mocks/generator-models';
import { AdurcDriver } from '../../interfaces/driver';
import { AdurcFindUniqueArgs } from '../../interfaces/client/find-first.args';
import { Adurc } from '../../interfaces/client';
import { BuilderStage } from '../../interfaces/builder.generator';

describe('resolver find unique tests', () => {
    let driver: AdurcDriver;
    let adurc: Adurc<AdurcMockModels>;

    beforeEach(async () => {
        const builder = new AdurcBuilder();
        builder.use(MockBuilderGenerator);
        builder.use(function* (context) {
            yield BuilderStage.OnAfterInit;
            driver = context.sources.find(x => x.name === 'mock').driver;
        });
        adurc = await builder.build<AdurcMockModels>();
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