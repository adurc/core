import v8 from 'v8';
import { AdurcFindManyArgs } from './interfaces/client/find-many.args';
import { AdurcMethods, AdurcMethodFindUnique, AdurcMethodAggregate, AdurcMethodCreateMany, AdurcMethodDeleteMany, AdurcMethodFindMany, AdurcMethodUpdateMany, AdurcMethod } from './interfaces/client/methods';
import { AdurcModelSelect } from './interfaces/client/select';
import { AdurcModel, AdurcFieldReferenceRelation, AdurcFieldReference } from './interfaces/model';
import { AdurcSource } from './interfaces/source';
import { AdurcSchema } from './interfaces/context';
import { Adurc } from '.';
import { AdurcMiddleware, AdurcMiddlewareRequest } from './interfaces/middleware';
import { AdurcSchemaBuilder } from './schema.builder';

type FindStrategyRelation = {
    path: string,
    modelAccessorName: string,
    args: AdurcFindManyArgs,
    collection: boolean,
    relation: AdurcFieldReferenceRelation,
};

type FindStrategy = {
    args: AdurcFindManyArgs;
    relations: FindStrategyRelation[];
};

function withContextBuilder(ctx: Readonly<Record<string, unknown>>) {
    const adurcCtx: Adurc = {
        ...this,
    };
    adurcCtx.context = { ...this.context, ...ctx };
    adurcCtx.withContext = withContextBuilder.bind(adurcCtx);
    return adurcCtx;
}

export class AdurcClientBuilder {
    private _mapSources: Map<string, AdurcSource>;
    private _mapModels: Map<string, Map<string, AdurcModel>>;
    private _adurc: Adurc;

    constructor(private context: AdurcSchemaBuilder) {
        this._mapSources = new Map();
        this._mapModels = new Map();
    }

    public generateProxyClient(): Adurc {
        const schema: AdurcSchema = {
            models: this.context.models,
            directives: this.context.directives,
            sources: this.context.sources,
            middlewares: this.context.middlewares,
        };

        this._adurc = {
            schema: schema,
            context: {},
            withContext: null,
            client: {},
        };

        this._adurc.withContext = withContextBuilder.bind(this._adurc);

        for (const source of this.context.sources) {
            this._mapSources.set(source.name, source);
            this._mapModels.set(source.name, new Map());
        }

        for (const model of this.context.models) {
            const map = this._mapModels.get(model.source);
            map.set(model.name, model);
            this._adurc.client[model.accessorName] = this.generateProxyModel(model);
        }

        return this._adurc;
    }

    private generateProxyModel(model: AdurcModel): AdurcMethods {
        return {
            aggregate: this.generateProxyMethodAggregate(model),
            findUnique: this.generateProxyMethodFindUnique(model),
            findMany: this.generateProxyMethodFindMany(model),
            createMany: this.generateProxyMethodCreateMany(model),
            updateMany: this.generateProxyMethodUpdateMany(model),
            deleteMany: this.generateProxyMethodDeleteMany(model),
        };
    }

    private generateProxyMethodAggregate(model: AdurcModel): AdurcMethodAggregate {
        const source = this.getSource(model.source);
        const middlewares = this.getMiddlewares(model, AdurcMethod.Aggregate);

        return async (args) => {
            const req: AdurcMiddlewareRequest = {
                args,
                ctx: this._adurc.context,
                method: AdurcMethod.Aggregate,
                model,
            };

            const middlewareResolver = await this.startMiddlewares(middlewares, req);

            const results = await source.driver.aggregate(model, args);

            await middlewareResolver(results);

            return results;
        };
    }

    private generateProxyMethodCreateMany(model: AdurcModel): AdurcMethodCreateMany {
        const source = this.getSource(model.source);
        const middlewares = this.getMiddlewares(model, AdurcMethod.CreateMany);

        return async (args) => {
            const req: AdurcMiddlewareRequest = {
                args,
                ctx: this._adurc.context,
                method: AdurcMethod.CreateMany,
                model,
            };

            const middlewareResolver = await this.startMiddlewares(middlewares, req);

            const results = await source.driver.createMany(model, args);

            await middlewareResolver(results);

            return results;
        };
    }

    private generateProxyMethodDeleteMany(model: AdurcModel): AdurcMethodDeleteMany {
        const source = this.getSource(model.source);
        const middlewares = this.getMiddlewares(model, AdurcMethod.DeleteMany);

        return async (args) => {
            const req: AdurcMiddlewareRequest = {
                args,
                ctx: this._adurc.context,
                method: AdurcMethod.DeleteMany,
                model,
            };

            const middlewareResolver = await this.startMiddlewares(middlewares, req);

            const results = await source.driver.deleteMany(model, args);

            await middlewareResolver(results);

            return results;
        };
    }

    private generateProxyMethodFindUnique(model: AdurcModel): AdurcMethodFindUnique {
        const source = this.getSource(model.source);
        const middlewares = this.getMiddlewares(model, AdurcMethod.FindUnique);

        return async (args) => {
            const strategy = this.findRecursiveNestedIncludes(model, { ...args, take: 1 });

            const req: AdurcMiddlewareRequest = {
                args,
                ctx: this._adurc.context,
                method: AdurcMethod.FindUnique,
                model,
            };

            const middlewareResolver = await this.startMiddlewares(middlewares, req);

            const results: Record<string, unknown>[] = await this.resolveFindStrategy(source, model, args, strategy) as Record<string, unknown>[];
            const result = results.length > 0 ? results[0] : null;

            await middlewareResolver(result);

            return result;
        };
    }

    private generateProxyMethodFindMany(model: AdurcModel): AdurcMethodFindMany {
        const source = this.getSource(model.source);
        const middlewares = this.getMiddlewares(model, AdurcMethod.FindMany);

        return async (args) => {
            const strategy = this.findRecursiveNestedIncludes(model, args);

            const req: AdurcMiddlewareRequest = {
                args,
                ctx: this._adurc.context,
                method: AdurcMethod.FindMany,
                model,
            };

            const middlewareResolver = await this.startMiddlewares(middlewares, req);

            const results: Record<string, unknown>[] = await this.resolveFindStrategy(source, model, args, strategy) as Record<string, unknown>[];

            await middlewareResolver(results);

            return results;
        };
    }

    private generateProxyMethodUpdateMany(model: AdurcModel): AdurcMethodUpdateMany {
        const source = this.getSource(model.source);
        const middlewares = this.getMiddlewares(model, AdurcMethod.UpdateMany);

        return async (args) => {
            const req: AdurcMiddlewareRequest = {
                args,
                ctx: this._adurc.context,
                method: AdurcMethod.UpdateMany,
                model,
            };

            const middlewareResolver = await this.startMiddlewares(middlewares, req);

            const results = await source.driver.updateMany(model, args);

            await middlewareResolver(results);

            return results;
        };
    }

    private getSource(name: string) {
        const source = this._mapSources.get(name);

        if (!source) {
            throw new Error(`Source ${name} not registered`);
        }

        return source;
    }

    private getMiddlewares(model: AdurcModel, method: AdurcMethod) {
        return this.context.middlewares.filter(x =>
            (!x.model || (x.model.source === model.source && x.model.name === model.name))
            && (!x.method || ((x.method & method) === method))
        );
    }

    private findRecursiveNestedIncludes(model: AdurcModel, args: AdurcFindManyArgs): FindStrategy {
        const output: FindStrategyRelation[] = [];

        const newArgs: AdurcFindManyArgs = v8.deserialize(v8.serialize(args));
        delete newArgs.include;

        if ('include' in args) {
            for (const fieldName in args.include) {
                const field = model.fields.find(x => x.accessorName === fieldName);
                const type = field.type as AdurcFieldReference;
                const subModel = this._mapModels.get(type.source).get(type.model);

                if (type.source !== model.source || type.relation) {
                    if (!type.relation) {
                        throw new Error('Expected relation when sources are different');
                    }
                    newArgs.select[type.relation.parentField] = true;
                    output.push({
                        path: fieldName,
                        relation: type.relation,
                        collection: field.collection,
                        modelAccessorName: subModel.accessorName,
                        args: field.collection
                            ? args.include[fieldName] as AdurcFindManyArgs
                            : { take: 1, select: args.include[fieldName] as AdurcModelSelect },
                    });
                } else {
                    newArgs.include = newArgs.include ?? [] as never;
                    newArgs.include[fieldName] = args.include[fieldName];
                }
            }
        }

        return { args: newArgs, relations: output };
    }

    private async startMiddlewares(middlewares: AdurcMiddleware[], req: AdurcMiddlewareRequest) {
        let middlewareNextResolver: (data: unknown) => void;
        const nextPromise = new Promise<unknown>((resolve, _reject) => { middlewareNextResolver = resolve; });

        const middlewarePromises: Promise<void>[] = [];
        for (const middleware of middlewares) {
            await new Promise<void>((resolve) => {
                const result = middleware.action(req, () => {
                    resolve();
                    return nextPromise;
                });
                if (result && 'then' in result) {
                    middlewarePromises.push(result);
                    result.then(() => resolve());
                }
            });
        }

        return (data: unknown) => {
            middlewareNextResolver(data);
            return Promise.all(middlewarePromises);
        };
    }

    private async resolveFindStrategy(
        source: AdurcSource,
        model: AdurcModel,
        args: AdurcFindManyArgs,
        strategy: FindStrategy,
    ): Promise<Record<string, unknown>[]> {
        const results = await source.driver.findMany(model, strategy.args);

        for (const sub of strategy.relations) {
            const inFilter = results.map(x => x[sub.relation.parentField]);

            const nestedArgs: AdurcFindManyArgs = {
                ...sub.args,
                select: {
                    ...sub.args.select,
                    [sub.relation.childField]: true,
                },
                where: {
                    ...sub.args.where,
                    [sub.relation.childField]: { in: inFilter as never[] },
                }
            };

            const subResults = await this._adurc.client[sub.modelAccessorName].findMany(nestedArgs);

            for (const result of results) {
                if (sub.collection) {
                    result[sub.path] = subResults.filter(x => x[sub.relation.childField] === result[sub.relation.parentField]);
                } else {
                    result[sub.path] = subResults.find(x => x[sub.relation.childField] === result[sub.relation.parentField]) ?? null;
                }
            }

            if (!(sub.relation.parentField in args.select)) {
                for (const result of results) {
                    delete result[sub.relation.parentField];
                }
            }

            if (!(sub.relation.childField in sub.args.select)) {
                for (const r of subResults) {
                    delete r[sub.relation.childField];
                }
            }
        }

        return results;
    }
}