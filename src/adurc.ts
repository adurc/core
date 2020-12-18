import { AdurcClient, AdurcClientMethodAggregate, AdurcClientMethodCreate, AdurcClientMethodDelete, AdurcClientMethodRead, AdurcClientMethods, AdurcClientMethodUpdate } from './interfaces/client/client';
import { AdurcModel } from './interfaces/model';
import { AdurcOptions } from './interfaces/options';
import camelCase from 'camelcase';
import readResolver from './resolvers/read.resolver';
import { ResolverContext } from './resolvers/resolver.context';

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

    private generateProxyMethodAggregate(_model: AdurcModel): AdurcClientMethodAggregate {
        return () => {
            return null;
        };
    }

    private generateProxyMethodCreate(_model: AdurcModel): AdurcClientMethodCreate {
        return () => {
            return null;
        };
    }

    private generateProxyMethodDelete(_model: AdurcModel): AdurcClientMethodDelete {
        return () => {
            return null;
        };
    }

    private generateProxyMethodRead(model: AdurcModel): AdurcClientMethodRead {
        return async (projection) => {
            return await readResolver(this._resolverContext, model, projection);
        };
    }

    private generateProxyMethodUpdate(_model: AdurcModel): AdurcClientMethodUpdate {
        return () => {
            return null;
        };
    }
}