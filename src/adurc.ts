import { AdurcClient } from './interfaces/client';
import { AdurcModel } from './interfaces/model';
import { AdurcContext } from './interfaces/context';
import camelCase from 'camelcase';
import { AdurcClientMethods, AdurcClientMethodAggregate, AdurcClientMethodCreateMany, AdurcClientMethodDeleteMany, AdurcClientMethodFindMany, AdurcClientMethodUpdateMany } from './interfaces/client/methods';
import { AdurcModelUntyped } from './interfaces/client/model';

export class Adurc<T = Record<string, AdurcModelUntyped>>  {
    private _client: AdurcClient;

    public get client(): AdurcClient<T> {
        return this._client as unknown as AdurcClient<T>;
    }

    constructor(
        public readonly context: AdurcContext,
    ) {
        this._client = this.generateProxyClient();
    }

    private generateProxyClient(): AdurcClient {
        const client: AdurcClient = {};

        for (const model of this.context.models) {
            client[camelCase(model.name)] = this.generateProxyModel(model);
        }

        return client;
    }

    private generateProxyModel(model: AdurcModel): AdurcClientMethods {
        return {
            aggregate: this.generateProxyMethodAggregate(model),
            findMany: this.generateProxyMethodFindMany(model),
            createMany: this.generateProxyMethodCreate(model),
            updateMany: this.generateProxyMethodUpdateMany(model),
            deleteMany: this.generateProxyMethodDelete(model),
        };
    }

    private generateProxyMethodAggregate(model: AdurcModel): AdurcClientMethodAggregate {
        const source = this.getSource(model.source);

        return async (args) => {
            const results = await source.driver.aggregate(model, args);
            return results;
        };
    }

    private generateProxyMethodCreate(model: AdurcModel): AdurcClientMethodCreateMany {
        const source = this.getSource(model.source);

        return async (args) => {
            const results = await source.driver.createMany(model, args);
            return results;
        };
    }

    private generateProxyMethodDelete(model: AdurcModel): AdurcClientMethodDeleteMany {
        const source = this.getSource(model.source);

        return async (args) => {
            const results = await source.driver.deleteMany(model, args);
            return results;
        };
    }

    private generateProxyMethodFindMany(model: AdurcModel): AdurcClientMethodFindMany {
        const source = this.getSource(model.source);

        return async (args) => {
            const results = await source.driver.findMany(model, args);
            return results;
        };
    }

    private generateProxyMethodUpdateMany(model: AdurcModel): AdurcClientMethodUpdateMany {
        const source = this.getSource(model.source);

        return async (args) => {
            const results = await source.driver.updateMany(model, args);
            return results;
        };
    }

    private getSource(name: string) {
        const source = this.context.sources.find(x => x.name === name);

        if (!source) {
            throw new Error(`Source ${name} not registered`);
        }

        return source;
    }
}