import { AdurcClient } from './interfaces/client';
import { AdurcFieldReference, AdurcFieldReferenceRelation, AdurcModel } from './interfaces/model';
import { AdurcContext } from './interfaces/context';
import camelCase from 'camelcase';
import { AdurcClientMethods, AdurcClientMethodAggregate, AdurcClientMethodCreateMany, AdurcClientMethodDeleteMany, AdurcClientMethodFindMany, AdurcClientMethodUpdateMany, AdurcClientMethodFindUnique } from './interfaces/client/methods';
import { AdurcModelUntyped } from './interfaces/client/model';
import { AdurcFindManyArgs } from './interfaces/client/find-many.args';
import { AdurcSource } from './interfaces/source';

export class Adurc<T = Record<string, AdurcModelUntyped>>  {
    private _client: AdurcClient;
    private _mapModelsWithAccessorNames: Map<string, string>;
    private _mapSources: Map<string, AdurcSource>;
    private _mapModels: Map<string, Map<string, AdurcModel>>;

    public get client(): AdurcClient<T> {
        return this._client as unknown as AdurcClient<T>;
    }

    constructor(
        public readonly context: AdurcContext,
    ) {
        this._mapModelsWithAccessorNames = new Map();
        this._mapSources = new Map();
        this._mapModels = new Map();
        this._client = this.generateProxyClient();
    }

    private generateProxyClient(): AdurcClient {
        const client: AdurcClient = {};

        for (const source of this.context.sources) {
            this._mapSources.set(source.name, source);
            this._mapModels.set(source.name, new Map());
        }

        for (const model of this.context.models) {
            const map = this._mapModels.get(model.source);
            map.set(model.name, model);

            const accessorName = camelCase(model.name);
            this._mapModelsWithAccessorNames.set(model.name, accessorName);
            client[accessorName] = this.generateProxyModel(model);
        }

        return client;
    }

    private generateProxyModel(model: AdurcModel): AdurcClientMethods {
        return {
            aggregate: this.generateProxyMethodAggregate(model),
            findUnique: this.generateProxyMethodFindUnique(model),
            findMany: this.generateProxyMethodFindMany(model),
            createMany: this.generateProxyMethodCreate(model),
            updateMany: this.generateProxyMethodUpdateMany(model),
            deleteMany: this.generateProxyMethodDelete(model),
        };
    }

    private generateProxyMethodFindUnique(model: AdurcModel): AdurcClientMethodFindUnique {
        const source = this.getSource(model.source);

        return async (args) => {
            const results = await source.driver.findMany(model, {
                ...args,
                take: 1,
            });
            return results.length > 0 ? results[0] : null;
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
            const nestedIncludes: {
                path: string,
                modelAccessorName: string,
                args: AdurcFindManyArgs,
                relation: AdurcFieldReferenceRelation,
            }[] = [];

            const findRecursiveNestedIncludes = (nArgs: AdurcFindManyArgs) => {
                const newArgs: AdurcFindManyArgs = { ...nArgs };
                delete newArgs.include;

                for (const fieldName in nArgs.include) {
                    const field = model.fields.find(x => x.name === fieldName);
                    const type = field.type as AdurcFieldReference;
                    const subModel = this._mapModels.get(type.source).get(type.model);

                    if (type.source !== model.source || type.relation) {
                        if (!type.relation) {
                            throw new Error('Expected relation when sources are different');
                        }
                        nestedIncludes.push({
                            path: fieldName,
                            relation: type.relation,
                            modelAccessorName: this._mapModelsWithAccessorNames.get(subModel.name),
                            args: nArgs.include[fieldName] as AdurcFindManyArgs,
                        });
                    } else {
                        newArgs.include[fieldName] = nArgs.include[fieldName];
                    }
                }

                return newArgs;
            };

            const newArgs = findRecursiveNestedIncludes(args);

            const results = await source.driver.findMany(model, newArgs);

            for (const sub of nestedIncludes) {
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

                const subResults = await this._client[sub.modelAccessorName].findMany(nestedArgs);

                for (const result of results) {
                    result[sub.path] = subResults.filter(x => x[sub.relation.childField] === result[sub.relation.parentField]);
                }

                if (!(sub.relation.childField in sub.args.select)) {
                    for (const r of subResults) {
                        delete r[sub.relation.childField];
                    }
                }
            }

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
        const source = this._mapSources.get(name);

        if (!source) {
            throw new Error(`Source ${name} not registered`);
        }

        return source;
    }
}