import v8 from 'v8';
import camelcase from 'camelcase';
import { AdurcFindManyArgs } from './interfaces/client/find-many.args';
import { AdurcMethods, AdurcMethodFindUnique, AdurcMethodAggregate, AdurcMethodCreateMany, AdurcMethodDeleteMany, AdurcMethodFindMany, AdurcMethodUpdateMany } from './interfaces/client/methods';
import { AdurcModelSelect } from './interfaces/client/select';
import { AdurcModel, AdurcFieldReferenceRelation, AdurcFieldReference } from './interfaces/model';
import { AdurcSource } from './interfaces/source';
import { AdurcContextBuilder } from './interfaces/context';
import { Adurc } from '.';

export class AdurcClientBuilder {
    private _mapModelsWithAccessorNames: Map<string, string>;
    private _mapSources: Map<string, AdurcSource>;
    private _mapModels: Map<string, Map<string, AdurcModel>>;

    constructor(private context: AdurcContextBuilder) {
        this._mapModelsWithAccessorNames = new Map();
        this._mapSources = new Map();
        this._mapModels = new Map();
    }

    public generateProxyClient(): Adurc {
        const client: Adurc = {};

        for (const source of this.context.sources) {
            this._mapSources.set(source.name, source);
            this._mapModels.set(source.name, new Map());
        }

        for (const model of this.context.models) {
            const map = this._mapModels.get(model.source);
            map.set(model.name, model);

            const accessorName = camelcase(model.name);
            this._mapModelsWithAccessorNames.set(model.name, accessorName);
            client[accessorName] = this.generateProxyModel(client, model);
        }

        return client;
    }

    private generateProxyModel(client: Adurc, model: AdurcModel): AdurcMethods {
        return {
            aggregate: this.generateProxyMethodAggregate(model),
            findUnique: this.generateProxyMethodFindUnique(model),
            findMany: this.generateProxyMethodFindMany(client, model),
            createMany: this.generateProxyMethodCreate(model),
            updateMany: this.generateProxyMethodUpdateMany(model),
            deleteMany: this.generateProxyMethodDelete(model),
        };
    }

    private generateProxyMethodFindUnique(model: AdurcModel): AdurcMethodFindUnique {
        const source = this.getSource(model.source);

        return async (args) => {
            const results = await source.driver.findMany(model, {
                ...args,
                take: 1,
            });
            return results.length > 0 ? results[0] : null;
        };
    }

    private generateProxyMethodAggregate(model: AdurcModel): AdurcMethodAggregate {
        const source = this.getSource(model.source);

        return async (args) => {
            const results = await source.driver.aggregate(model, args);
            return results;
        };
    }

    private generateProxyMethodCreate(model: AdurcModel): AdurcMethodCreateMany {
        const source = this.getSource(model.source);

        return async (args) => {
            const results = await source.driver.createMany(model, args);
            return results;
        };
    }

    private generateProxyMethodDelete(model: AdurcModel): AdurcMethodDeleteMany {
        const source = this.getSource(model.source);

        return async (args) => {
            const results = await source.driver.deleteMany(model, args);
            return results;
        };
    }

    private generateProxyMethodFindMany(client: Adurc, model: AdurcModel): AdurcMethodFindMany {
        const source = this.getSource(model.source);

        return async (args) => {
            const nestedIncludes: {
                path: string,
                modelAccessorName: string,
                args: AdurcFindManyArgs,
                collection: boolean,
                relation: AdurcFieldReferenceRelation,
            }[] = [];

            const findRecursiveNestedIncludes = (nArgs: AdurcFindManyArgs) => {
                const newArgs: AdurcFindManyArgs = v8.deserialize(v8.serialize(nArgs));
                delete newArgs.include;

                for (const fieldName in nArgs.include) {
                    const field = model.fields.find(x => x.name === fieldName);
                    const type = field.type as AdurcFieldReference;
                    const subModel = this._mapModels.get(type.source).get(type.model);

                    if (type.source !== model.source || type.relation) {
                        if (!type.relation) {
                            throw new Error('Expected relation when sources are different');
                        }
                        newArgs.select[type.relation.parentField] = true;
                        nestedIncludes.push({
                            path: fieldName,
                            relation: type.relation,
                            collection: field.collection,
                            modelAccessorName: this._mapModelsWithAccessorNames.get(subModel.name),
                            args: field.collection
                                ? nArgs.include[fieldName] as AdurcFindManyArgs
                                : { take: 1, select: nArgs.include[fieldName] as AdurcModelSelect },
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

                const subResults = await client[sub.modelAccessorName].findMany(nestedArgs);

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
        };
    }

    private generateProxyMethodUpdateMany(model: AdurcModel): AdurcMethodUpdateMany {
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