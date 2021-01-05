import { BuilderStage } from '../interfaces/builder.generator';
import { AdurcBuilder } from '../builder';
import { adurcUserModel } from './mocks/mock-user-model';
import MockDriver from './mocks/mock-driver';

describe('arduc builder tests', () => {

    it('execute raw function generator', async () => {
        const builder = new AdurcBuilder();
        const results: number[] = [];

        builder.use(function (_context) {
            results.push(1);
        });

        await builder.build();

        expect(results).toStrictEqual([1]);
    });

    it('execute raw async function generator', async () => {
        const builder = new AdurcBuilder();
        const results: number[] = [];

        builder.use(async function (_context) {
            results.push(1);
            return Promise.resolve();
        });

        await builder.build();

        expect(results).toStrictEqual([1]);
    });

    it('execute register generator', async () => {
        const builder = new AdurcBuilder();
        const results: number[] = [];

        builder.use(async function* (_context) {
            results.push(1);
            yield BuilderStage.OnInit;
            results.push(2);
            yield BuilderStage.OnAfterInit;
            results.push(3);
        });

        await builder.build();

        expect(results).toStrictEqual([1, 2, 3]);
    });

    it('execute combined generators', async () => {
        const builder = new AdurcBuilder();
        const results: number[] = [];

        // raw function
        builder.use(function (_context) {
            results.push(1);
        });

        // raw async function
        builder.use(async function (_context) {
            await new Promise(resolve => setTimeout(resolve, 100));
            results.push(2);
        });

        // generator
        builder.use(function* (_context) {
            results.push(3);
            yield BuilderStage.OnAfterInit;
            results.push(4);
        });

        // async generator
        builder.use(async function* (_context) {
            await new Promise(resolve => setTimeout(resolve, 100));
            results.push(5);
            yield BuilderStage.OnInit;
            results.push(6);
        });


        await builder.build();

        expect(results).toStrictEqual([1, 2, 3, 5, 6, 4]);
    });

    it('execute multiples register generator', async () => {
        const builder = new AdurcBuilder();
        const results: number[] = [];

        builder.use(async function* (_context) {
            results.push(10);
            yield BuilderStage.OnInit;
            results.push(11);
            yield BuilderStage.OnAfterInit;
            results.push(12);
        });

        builder.use(async function* (_context) {
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

        builder.use(function (context) {
            context.sources.push({ name: 'mock', driver: new MockDriver() });
            context.models.push(adurcUserModel);
        });

        const adurc = await builder.build();

        expect(adurc.context.models).toStrictEqual([adurcUserModel]);
    });

});