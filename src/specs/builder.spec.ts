import { BuilderStage } from '../interfaces/builder.generator';
import { AdurcBuilder } from '../builder';
import { adurcUserModel } from './mocks/mock-user-model';
import { SourceBuilder } from '../builders/source.builder';
import MockDriver from './mocks/mock-driver';

describe('arduc builder tests', () => {

    it('execute register generator', async () => {
        const builder = new AdurcBuilder();
        const results: number[] = [];

        builder.use(async function* (_builder) {
            results.push(1);
            yield BuilderStage.OnInit;
            results.push(2);
            yield BuilderStage.OnAfterInit;
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
            yield BuilderStage.OnInit;
            results.push(11);
            yield BuilderStage.OnAfterInit;
            results.push(12);
        });

        builder.use(async function* (_builder) {
            results.push(20);
            yield BuilderStage.OnInit;
            results.push(21);
            yield BuilderStage.OnAfterInit;
            results.push(22);
        });

        await builder.build();

        expect(results).toStrictEqual([10, 20, 11, 21, 12, 22]);
    });

    it('register model', async () => {
        const builder = new AdurcBuilder();

        builder.use(async function* (context) {
            context.models.push(adurcUserModel);
            yield;
        });

        const adurc = await builder.build();

        expect(adurc.context.models).toStrictEqual([adurcUserModel]);
    });

    it('register source', async () => {
        const builder = new AdurcBuilder();
        const driver = new MockDriver('mock-driver');

        builder.use(SourceBuilder.use({ name: 'mock', driver }));

        const adurc = await builder.build();

        expect(adurc.context.sources).toStrictEqual([{
            name: 'mock',
            driver,
        }]);
    });
});