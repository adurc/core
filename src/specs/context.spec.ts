import { AdurcBuilder } from '..';
import { MockBuilderGenerator } from './mocks/generator-models';
import { AdurcMockModels } from './mocks/mock-models';

describe('adurc context execution', () => {

    it('define context', async () => {
        const builder = new AdurcBuilder();
        builder.use(MockBuilderGenerator);

        const adurc = await builder.build<AdurcMockModels>();

        const context1 = {
            user: { id: 1, name: 'adurcariano' },
        };

        const contextualized1 = adurc.withContext(context1);

        const context2 = {
            agency: { id: 1, name: 'agency' },
        };

        const contextualized2 = contextualized1.withContext(context2);

        expect(contextualized1.context).toEqual(context1);
        expect(contextualized2.context).toEqual({ ...context1, ...context2 });
    });

    it('send context to middleware', async () => {
        const builder = new AdurcBuilder();
        let receivedContext: Record<string, unknown> = null;

        builder.use(MockBuilderGenerator);

        builder.use(function (ctx) {
            ctx.addMiddleware({
                action: async (req, next) => {
                    receivedContext = req.ctx;
                    await next();
                },
            });
        });

        const adurc = await builder.build<AdurcMockModels>();

        const context = {
            user: { id: 1, name: 'adurcariano' },
        };

        const adurcCtx = adurc.withContext(context);

        await adurcCtx.client.user.findMany({
            select: {
                id: true,
                name: true,
            }
        });

        expect(adurc.context).toEqual({});
        expect(adurcCtx.context).toEqual(context);
        expect(receivedContext).toEqual(context);
    });
});