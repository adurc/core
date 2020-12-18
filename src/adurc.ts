import { AdurcClient, AdurcClientMethodAggregate, AdurcClientMethodCreate, AdurcClientMethodDelete, AdurcClientMethodRead, AdurcClientMethods, AdurcClientMethodUpdate } from './interfaces/client/client';
import { AdurcModel } from './interfaces/model';
import { AdurcOptions } from './interfaces/options';
import camelCase from 'camelcase';
import readResolver from './resolvers/read.resolver';
import { ResolverContext } from './resolvers/resolver.context';
import aggregateResolver from './resolvers/aggregate.resolver';
import createResolver from './resolvers/create.resolver';
import updateResolver from './resolvers/update.resolver';
import deleteResolver from './resolvers/delete.resolver';

export class Adurc<T = Record<string, unknown>>  {
    private _models: AdurcModel[] = [];
    private _client: AdurcClient<T>;
    private _resolverContext: ResolverContext;

    public get client(): AdurcClient<T> {
        return this._client;
    }

    public get models(): ReadonlyArray<AdurcModel> {
        return this._models;
    }

    constructor(
        public readonly options: AdurcOptions,
    ) {
        this._client = this.generateProxyClient() as AdurcClient<T>;
        this._resolverContext = {
            models: this._models,
            sources: {},
        };
    }

    private generateProxyClient(): AdurcClient {
        const client: AdurcClient = {};

        for (const model of this._models) {
            client[camelCase(model.name)] = this.generateProxyModel(model);
        }

        return client;
    }

    private generateProxyModel(model: AdurcModel): AdurcClientMethods {
        return {
            aggregate: this.generateProxyMethodAggregate(model),
            create: this.generateProxyMethodCreate(model),
            delete: this.generateProxyMethodDelete(model),
            read: this.generateProxyMethodRead(model),
            update: this.generateProxyMethodUpdate(model),
        };
    }

    private generateProxyMethodAggregate(model: AdurcModel): AdurcClientMethodAggregate {
        return async (projection) => {
            return await aggregateResolver(this._resolverContext, model, projection);
        };
    }

    private generateProxyMethodCreate(model: AdurcModel): AdurcClientMethodCreate {
        return async (projection) => {
            return await createResolver(this._resolverContext, model, projection);
        };
    }

    private generateProxyMethodDelete(model: AdurcModel): AdurcClientMethodDelete {
        return async (projection) => {
            return await deleteResolver(this._resolverContext, model, projection);
        };
    }

    private generateProxyMethodRead(model: AdurcModel): AdurcClientMethodRead {
        return async (projection) => {
            return await readResolver(this._resolverContext, model, projection);
        };
    }

    private generateProxyMethodUpdate(model: AdurcModel): AdurcClientMethodUpdate {
        return async (projection) => {
            return await updateResolver(this._resolverContext, model, projection);
        };
    }
}