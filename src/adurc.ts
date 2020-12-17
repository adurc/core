import { AdurcClient } from './interfaces/client';
import { AdurcModel } from './interfaces/model';
import { AdurcContext } from './interfaces/context';
import camelCase from 'camelcase';
import findManyResolver from './resolvers/find-many.resolver';
import aggregateResolver from './resolvers/aggregate.resolver';
import createManyResolver from './resolvers/create-many.resolver';
import updateManyResolver from './resolvers/update.resolver';
import deleteManyResolver from './resolvers/delete-many.resolver';
import { AdurcClientMethods, AdurcClientMethodAggregate, AdurcClientMethodCreateMany, AdurcClientMethodDeleteMany, AdurcClientMethodFindMany, AdurcClientMethodUpdateMany } from './interfaces/client/methods';

export class Adurc<T = Record<string, unknown>>  {
    private _client: AdurcClient<T>;

    public get client(): AdurcClient<T> {
        return this._client;
    }

    constructor(
        public readonly context: AdurcContext,
    ) {
        this._client = this.generateProxyClient() as AdurcClient<T>;
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
        return async (args) => {
            return await aggregateResolver(this.context, model, args);
        };
    }

    private generateProxyMethodCreate(model: AdurcModel): AdurcClientMethodCreateMany {
        return async (args) => {
            return await createManyResolver(this.context, model, args);
        };
    }

    private generateProxyMethodDelete(model: AdurcModel): AdurcClientMethodDeleteMany {
        return async (args) => {
            return await deleteManyResolver(this.context, model, args);
        };
    }

    private generateProxyMethodFindMany(model: AdurcModel): AdurcClientMethodFindMany {
        return async (args) => {
            return await findManyResolver(this.context, model, args);
        };
    }

    private generateProxyMethodUpdateMany(model: AdurcModel): AdurcClientMethodUpdateMany {
        return async (args) => {
            return await updateManyResolver(this.context, model, args);
        };
    }
}