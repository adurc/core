import { AdurcBuilder, RegisterStage } from '../builder';
import { adurcUserModel } from './mocks/mock-user-model';

describe('arduc builder tests', () => {

    it('execute register generator', async () => {
        const builder = new AdurcBuilder();
        const results: number[] = [];

        builder.use(async function* (_builder) {
            results.push(1);
            yield RegisterStage.OnInit;
            results.push(2);
            yield RegisterStage.OnAfterInit;
            results.push(3);
        });

        await builder.build();

        expect(results).toStrictEqual([1, 2, 3]);
    });

    it('execute multiples register generator', async () => {
        const builder = new AdurcBuilder();
        const results: number[] = [];

        builder.use(async function* (_builder) {
            results.push(10);
            yield RegisterStage.OnInit;
            results.push(11);
            yield RegisterStage.OnAfterInit;
            results.push(12);
        });

        builder.use(async function* (_builder) {
            results.push(20);
            yield RegisterStage.OnInit;
            results.push(21);
            yield RegisterStage.OnAfterInit;
            results.push(22);
        });

        await builder.build();

        expect(results).toStrictEqual([10, 20, 11, 21, 12, 22]);
    });

    it('register model', async () => {
        const builder = new AdurcBuilder();

        builder.models.push(adurcUserModel);

        const adurc = await builder.build();

        expect(adurc.context.models).toStrictEqual([adurcUserModel]);
    });

});