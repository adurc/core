import v8 from 'v8';
import { AdurcFindManyArgs } from './interfaces/client/find-many.args';
import { AdurcMethods, AdurcMethodFindUnique, AdurcMethodAggregate, AdurcMethodCreateMany, AdurcMethodDeleteMany, AdurcMethodFindMany, AdurcMethodUpdateMany, AdurcMethod, AdurcMethodFlags } from './interfaces/client/methods';
import { AdurcModelSelect } from './interfaces/client/select';
import { AdurcModel, AdurcFieldReferenceRelation, AdurcFieldReference } from './interfaces/model';
import { AdurcSource } from './interfaces/source';
import { AdurcSchema } from './interfaces/schema';
import { Adurc } from '.';
import { AdurcMiddleware, AdurcMiddlewareRequest } from './interfaces/middleware';
import { AdurcSchemaBuilder } from './schema.builder';
import { AdurcAggregateArgs } from './interfaces/client/aggregate.args';
import { AggregateResult } from './interfaces/client/aggregate.result';
import { AdurcCreateArgs } from './interfaces/client/create.args';
import { BatchResult } from './interfaces/client/batch.result';
import { AdurcDeleteArgs } from './interfaces/client/delete.args';
import { AdurcFindUniqueArgs } from './interfaces/client/find-first.args';
import { AdurcUpdateArgs } from './interfaces/client/update.args';
import { AdurcUnknownSourceError } from './errors/unknown-source.error';
import { AdurcExpectedRelationError } from './errors/expected-relation.error';

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

export class AdurcClientBuilder {
    private _mapSources: Map<string, AdurcSource>;
    private _mapModels: Map<string, Map<string, AdurcModel>>;
    // private _adurc: Adurc;

    constructor(
        private schema: AdurcSchemaBuilder,
    ) {
        this._mapSources = new Map();
        this._mapModels = new Map();
    }

    private withContextBuilder(adurc: Adurc) {
        return (ctx: Readonly<Record<string, unknown>>) => {
            const adurcCtx: Adurc = {
                ...adurc,
                client: {
                    ...adurc.client,
                },
                context: {
                    ...adurc.context,
                    ...ctx,
                },
            };

            adurcCtx.withContext = this.withContextBuilder(adurcCtx) as never;

            this.generateProxyModels(adurcCtx);

            return adurcCtx;
        };
    }

    public generateProxyClient(): Adurc {
        const schema: AdurcSchema = {
            models: this.schema.models,
            directives: this.schema.directives,
            sources: this.schema.sources,
            middlewares: this.schema.middlewares,
        };

        for (const source of this.schema.sources) {
            this._mapSources.set(source.name, source);
            this._mapModels.set(source.name, new Map());
        }

        const adurc: Adurc = {
            schema: schema,
            context: {},
            withContext: null,
            client: {},
        };

        adurc.withContext = this.withContextBuilder(adurc) as never;

        this.generateProxyModels(adurc);

        return adurc;
    }

    private generateProxyModels(adurc: Adurc) {
        for (const model of this.schema.models) {
            const map = this._mapModels.get(model.source);
            map.set(model.name, model);
            adurc.client[model.accessorName] = this.generateProxyModel(adurc, model);
        }
    }

    private generateProxyModel(adurc: Adurc, model: AdurcModel): AdurcMethods {
        return {
            aggregate: this.generateProxyMethodAggregate(adurc, model),
            findUnique: this.generateProxyMethodFindUnique(adurc, model),
            findMany: this.generateProxyMethodFindMany(adurc, model),
            createMany: this.generateProxyMethodCreateMany(adurc, model),
            updateMany: this.generateProxyMethodUpdateMany(adurc, model),
            deleteMany: this.generateProxyMethodDeleteMany(adurc, model),
        };
    }

    private generateProxyMethodAggregate(adurc: Adurc, model: AdurcModel): AdurcMethodAggregate {
        const source = this.getSource(model.source);
        const middlewares = this.getMiddlewares(model, AdurcMethodFlags.Aggregate);

        return async function (args: AdurcAggregateArgs): Promise<AggregateResult> {
            const req: AdurcMiddlewareRequest = {
                args,
                ctx: this.context,
                method: AdurcMethod.Aggregate,
                model,
            };

            const middlewareResolver = await AdurcClientBuilder.startMiddlewares(middlewares, req);

            const results = await source.driver.aggregate(model, args);

            await middlewareResolver(results);

            return results;
        }.bind(adurc);
    }

    private generateProxyMethodCreateMany(adurc: Adurc, model: AdurcModel): AdurcMethodCreateMany {
        const source = this.getSource(model.source);
        const middlewares = this.getMiddlewares(model, AdurcMethodFlags.CreateMany);

        return async function (args: AdurcCreateArgs): Promise<BatchResult> {
            const req: AdurcMiddlewareRequest = {
                args,
                ctx: this.context,
                method: AdurcMethod.CreateMany,
                model,
            };

            const middlewareResolver = await AdurcClientBuilder.startMiddlewares(middlewares, req);

            const results = await source.driver.createMany(model, args);

            await middlewareResolver(results);

            return results;
        }.bind(adurc);
    }

    private generateProxyMethodDeleteMany(adurc: Adurc, model: AdurcModel): AdurcMethodDeleteMany {
        const source = this.getSource(model.source);
        const middlewares = this.getMiddlewares(model, AdurcMethodFlags.DeleteMany);

        return async function (args: AdurcDeleteArgs): Promise<BatchResult> {
            const req: AdurcMiddlewareRequest = {
                args,
                ctx: this.context,
                method: AdurcMethod.DeleteMany,
                model,
            };

            const middlewareResolver = await AdurcClientBuilder.startMiddlewares(middlewares, req);

            const results = await source.driver.deleteMany(model, args);

            await middlewareResolver(results);

            return results;
        }.bind(adurc);
    }

    private generateProxyMethodFindUnique(adurc: Adurc, model: AdurcModel): AdurcMethodFindUnique {
        const source = this.getSource(model.source);
        const middlewares = this.getMiddlewares(model, AdurcMethodFlags.FindUnique);
        const $resolveFindStrategy = this.resolveFindStrategy.bind(this);
        const $findRecursiveNestedIncludes = this.findRecursiveNestedIncludes.bind(this);

        return async function (args: AdurcFindUniqueArgs): Promise<Record<string, unknown>> {
            const strategy = $findRecursiveNestedIncludes(model, { ...args, take: 1 });

            const req: AdurcMiddlewareRequest = {
                args,
                ctx: this.context,
                method: AdurcMethod.FindUnique,
                model,
            };

            const middlewareResolver = await AdurcClientBuilder.startMiddlewares(middlewares, req);

            const results: Record<string, unknown>[] = await $resolveFindStrategy(this, source, model, args, strategy) as Record<string, unknown>[];
            const result = results.length > 0 ? results[0] : null;

            await middlewareResolver(result);

            return result;
        }.bind(adurc);
    }

    private generateProxyMethodFindMany(adurc: Adurc, model: AdurcModel): AdurcMethodFindMany {
        const source = this.getSource(model.source);
        const middlewares = this.getMiddlewares(model, AdurcMethodFlags.FindMany);
        const $resolveFindStrategy = this.resolveFindStrategy.bind(this);
        const $findRecursiveNestedIncludes = this.findRecursiveNestedIncludes.bind(this);

        return async function (args: AdurcFindManyArgs): Promise<Record<string, unknown>[]> {
            const req: AdurcMiddlewareRequest = {
                args,
                ctx: this.context,
                method: AdurcMethod.FindMany,
                model,
            };

            const middlewareResolver = await AdurcClientBuilder.startMiddlewares(middlewares, req);

            const strategy = $findRecursiveNestedIncludes(model, req.args);

            const results: Record<string, unknown>[] = await $resolveFindStrategy(this, source, model, args, strategy) as Record<string, unknown>[];

            await middlewareResolver(results);

            return results;
        }.bind(adurc);
    }

    private generateProxyMethodUpdateMany(adurc: Adurc, model: AdurcModel): AdurcMethodUpdateMany {
        const source = this.getSource(model.source);
        const middlewares = this.getMiddlewares(model, AdurcMethodFlags.UpdateMany);

        return async function (args: AdurcUpdateArgs): Promise<BatchResult> {
            const req: AdurcMiddlewareRequest = {
                args,
                ctx: this.context,
                method: AdurcMethod.UpdateMany,
                model,
            };

            const middlewareResolver = await AdurcClientBuilder.startMiddlewares(middlewares, req);

            const results = await source.driver.updateMany(model, args);

            await middlewareResolver(results);

            return results;
        }.bind(adurc);
    }

    private getSource(name: string) {
        const source = this._mapSources.get(name);

        if (!source) {
            throw new AdurcUnknownSourceError(name);
        }

        return source;
    }

    private getMiddlewares(model: AdurcModel, method: AdurcMethodFlags) {
        return this.schema.middlewares.filter(x => {
            let ok = true;

            if ('model' in x) {
                const modelsContraint = x.model instanceof Array ? x.model : [x.model];
                ok = ok && (modelsContraint.length === 0 || modelsContraint.findIndex(m => m.source === model.source && m.name === model.name) >= 0);
            }

            if ('method' in x) {
                ok = ok && (x.method & method) === method;
            }

            if ('directive' in x) {
                const directivesContraint = x.directive instanceof Array ? x.directive : [x.directive];
                ok = ok && (
                    directivesContraint.length === 0
                    || directivesContraint.findIndex(m =>
                        model.directives.findIndex(d => d.provider === m.provider && d.name === m.name) >= 0
                        || model.fields.findIndex(f => f.directives.findIndex(d => d.provider === m.provider && d.name === m.name) >= 0) >= 0
                    ) >= 0
                );
            }

            return ok;
        });
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
                        throw new AdurcExpectedRelationError(model, field);
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

    private static async startMiddlewares(middlewares: AdurcMiddleware[], req: AdurcMiddlewareRequest) {
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
        adurc: Adurc,
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

            const subResults = await adurc.client[sub.modelAccessorName].findMany(nestedArgs);

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