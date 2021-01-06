import { AdurcFindManyArgs } from '../../interfaces/client/find-many.args';
import { adurcUserModel, UserModel } from '../mocks/mock-user-model';
import { AdurcBuilder } from '../../builder';
import { AdurcMockModels } from '../mocks/mock-models';
import { MockBuilderGenerator } from '../mocks/generator-models';
import { AdurcDriver } from '../../interfaces/driver';
import { adurcPostModel, PostModel } from '../mocks/mock-post-model';
import { adurcTagModel, TagModel } from '../mocks/mock-tags-model';
import { Adurc } from '../../interfaces/client';
import { BuilderStage } from '../../interfaces/builder.generator';

describe('resolver find many tests', () => {
    let driver: AdurcDriver;
    let driver2: AdurcDriver;
    let adurc: Adurc<AdurcMockModels>;

    beforeEach(async () => {
        const builder = new AdurcBuilder();
        builder.use(MockBuilderGenerator);
        builder.use(function* (context) {
            yield BuilderStage.OnAfterInit;
            driver = context.sources.find(x => x.name === 'mock').driver;
            driver2 = context.sources.find(x => x.name === 'mock2').driver;
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

        await adurc.user.findMany(args);

        expect(driver.findMany).toHaveBeenCalledTimes(1);
        expect(driver.findMany).toHaveBeenCalledWith(adurcUserModel, args);
    });

    it('find many with relation one to many as different source', async () => {
        const tagsArgs: AdurcFindManyArgs<TagModel> = {
            select: {
                id: true,
                name: true,
            }
        };

        const postArgs: AdurcFindManyArgs<PostModel> = {
            select: {
                id: true
            },
            include: {
                tags: tagsArgs,
            }
        };

        driver.findMany = jest.fn(() => [{ id: 1 }, { id: 2 }]);
        driver2.findMany = jest.fn(() => [{ userId: 2, id: 50, name: 'tag one' }, { userId: 1, id: 100, name: 'tag two' }]);

        const result = await adurc.post.findMany(postArgs);

        expect(driver.findMany).toHaveBeenCalledTimes(1);
        expect(driver.findMany).toHaveBeenCalledWith(adurcPostModel, {
            select: {
                id: true
            },
        });

        expect(driver2.findMany).toHaveBeenCalledTimes(1);
        expect(driver2.findMany).toHaveBeenCalledWith(adurcTagModel, {
            where: {
                userId: {
                    in: [1, 2]
                }
            },
            select: {
                id: true,
                name: true,
                userId: true,
            }
        });

        expect(result).toEqual([
            { id: 1, tags: [{ id: 100, name: 'tag two' }] },
            { id: 2, tags: [{ id: 50, name: 'tag one' }] },
        ]);
    });

    it('find many with relation many to one as different source', async () => {
        const postArgs: AdurcFindManyArgs<PostModel> = {
            select: {
                id: true
            },
            include: {
                someTag: {
                    id: true,
                    name: true,
                },
            }
        };

        driver.findMany = jest.fn(() => [{ id: 1, someTagId: 50 }, { id: 2, someTagId: 100 }]);
        driver2.findMany = jest.fn(() => [{ id: 50, name: 'tag one' }, { id: 100, name: 'tag two' }]);

        const result = await adurc.post.findMany(postArgs);

        expect(driver.findMany).toHaveBeenCalledTimes(1);
        expect(driver.findMany).toHaveBeenCalledWith(adurcPostModel, {
            select: {
                id: true,
                someTagId: true,
            },
        });

        expect(driver2.findMany).toHaveBeenCalledTimes(1);
        expect(driver2.findMany).toHaveBeenCalledWith(adurcTagModel, {
            where: {
                id: {
                    in: [50, 100]
                }
            },
            take: 1,
            select: {
                id: true,
                name: true,
            }
        });

        expect(result).toEqual([
            { id: 1, someTag: { id: 50, name: 'tag one' } },
            { id: 2, someTag: { id: 100, name: 'tag two' } },
        ]);
    });
});