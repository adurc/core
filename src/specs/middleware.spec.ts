import { AdurcBuilder } from '..';
import { AdurcMethodFlags } from '../interfaces/client/methods';
import { AdurcMiddlewareAction } from '../interfaces/middleware';
import { MockBuilderGenerator } from './mocks/generator-models';
import { AdurcMockModels } from './mocks/mock-models';

describe('adurc middleware tests', () => {

    it('define basic middleware', async () => {
        const builder = new AdurcBuilder();

        builder.use(MockBuilderGenerator);

        const action: AdurcMiddlewareAction = (_req, next) => {
            next();
        };

        const mockAction = jest.fn(action);

        builder.use(function (schema) {
            schema.addMiddleware({
                action: mockAction,
            });
        });

        const adurc = await builder.build<AdurcMockModels>();

        await adurc.client.user.findMany({ select: { id: true, name: true } });

        expect(mockAction).toHaveBeenCalled();
    });

    it('define two basic middleware', async () => {
        const builder = new AdurcBuilder();
        const data: number[] = [];

        builder.use(MockBuilderGenerator);
        builder.use(function (schema) {
            schema.addMiddleware({
                action: async (_req, next) => {
                    data.push(1);
                    await next();
                    data.push(2);
                },
            });
            schema.addMiddleware({
                action: async (_req, next) => {
                    data.push(3);
                    await next();
                    data.push(4);
                },
            });
        });

        const adurc = await builder.build<AdurcMockModels>();

        await adurc.client.user.findMany({ select: { id: true, name: true } });

        expect(data).toHaveLength(4);
        expect(data).toEqual([1, 3, 2, 4]);
    });

    it('middleware constraint model', async () => {
        const builder = new AdurcBuilder();

        builder.use(MockBuilderGenerator);

        let callsUserMiddleware = 0;
        let callsPostMiddleware = 0;

        builder.use(function (schema) {
            schema.addMiddleware({
                model: { source: 'mock', name: 'Post' },
                action: async (req, next) => {
                    callsPostMiddleware++;
                    await next();
                },
            });

            schema.addMiddleware({
                model: { source: 'mock', name: 'User' },
                action: async (_req, next) => {
                    callsUserMiddleware++;
                    await next();
                },
            });
        });

        const adurc = await builder.build<AdurcMockModels>();

        await adurc.client.user.findMany({ select: { id: true, name: true } });

        await adurc.client.post.findMany({ select: { id: true, title: true } });

        expect(callsUserMiddleware).toEqual(1);
        expect(callsPostMiddleware).toEqual(1);
    });

    it('middleware constraint method', async () => {
        const builder = new AdurcBuilder();
        let callsMiddleware = 0;

        builder.use(MockBuilderGenerator);
        builder.use(function (schema) {
            schema.addMiddleware({
                method: AdurcMethodFlags.FindUnique | AdurcMethodFlags.FindMany,
                action: async (req, next) => {
                    callsMiddleware++;
                    await next();
                },
            });
        });

        const adurc = await builder.build<AdurcMockModels>();

        await adurc.client.user.deleteMany({ where: { id: 1 }, select: { id: true, name: true } });
        await adurc.client.user.findMany({ select: { id: true, name: true } });
        await adurc.client.user.findUnique({ where: { id: 1 }, select: { id: true, name: true } });

        expect(callsMiddleware).toEqual(2);
    });

    it('middleware constraint directive', async () => {
        const builder = new AdurcBuilder();
        let callsMiddleware = 0;

        builder.use(MockBuilderGenerator);
        builder.use(function (schema) {
            schema.addMiddleware({
                directive: { name: 'isEmail', provider: 'validation' },
                action: async (req, next) => {
                    callsMiddleware++;
                    await next();
                },
            });
        });

        const adurc = await builder.build<AdurcMockModels>();

        await adurc.client.user.findMany({ select: { id: true, name: true } });
        await adurc.client.post.findMany({ select: { id: true, title: true } });

        expect(callsMiddleware).toEqual(1);
    });
});