import { AdurcContext } from './interfaces/context';
import { AdurcDriver } from './driver';
import { AdurcDirectiveDefinition, AdurcModel } from './interfaces/model';
import { AdurcOptions } from './interfaces/options';
import { ProjectionInfo } from './interfaces/projection';
import { IDriverCreateUpdateRes, TDriverReadRes, TDriverDeleteRes, IDriverAggregateRes } from './interfaces/driver';

export class Adurc {
    private _defaultSource: AdurcDriver;
    private _models: AdurcModel[] = [];
    private _mapModelsByName: Map<string, AdurcModel> = new Map();
    private _mapModelSource: Map<string, AdurcDriver> = new Map();
    private _dsContext: AdurcContext;

    public get models(): ReadonlyArray<AdurcModel> {
        return this._models;
    }

    public get directives(): ReadonlyArray<AdurcDirectiveDefinition> {
        return this.options.directives;
    }

    constructor(
        public readonly options: AdurcOptions,
    ) {
    }

    public async init(): Promise<void> {
        this._defaultSource = this.options.sources.get(this.options.defaultSource);

        for (const introspector of this.options.introspectors) {
            const modelsIntrospected = await introspector.introspect();
            for (const model of modelsIntrospected) {
                this.loadModel(model);
            }
        }

        this._dsContext = {
            models: this.models,
        };

        const sourcesIterator = this.options.sources.values();
        for (const driver of sourcesIterator) {
            await driver.setContext(this._dsContext);
        }
    }

    public async create(projection: ProjectionInfo): Promise<IDriverCreateUpdateRes> {
        const model = this.getModel(projection.name);
        const driver = this.getModelDriver(model.name);
        return await driver.create(projection);
    }

    public async read(projection: ProjectionInfo): Promise<TDriverReadRes> {
        const model = this.getModel(projection.name);
        const driver = this.getModelDriver(model.name);
        return await driver.read(projection);
    }

    public async update(projection: ProjectionInfo): Promise<IDriverCreateUpdateRes> {
        const model = this.getModel(projection.name);
        const driver = this.getModelDriver(model.name);
        return await driver.update(projection);
    }

    public async delete(projection: ProjectionInfo): Promise<TDriverDeleteRes> {
        const model = this.getModel(projection.name);
        const driver = this.getModelDriver(model.name);
        return await driver.delete(projection);
    }

    public async aggregate(projection: ProjectionInfo): Promise<IDriverAggregateRes> {
        const model = this.getModel(projection.name);
        const driver = this.getModelDriver(model.name);
        return await driver.aggregate(projection);
    }

    private getModel(name: string): AdurcModel {
        const model = this._mapModelsByName.get(name);

        if (!model) {
            throw new Error(`Model ${name} not registered`);
        }

        return model;
    }

    private getModelDriver(modelName: string): AdurcDriver {
        const driver = this._mapModelSource.get(modelName);

        if (!driver) {
            throw new Error(`Source not found for model ${modelName}`);
        }

        return driver;
    }

    private loadModel(model: AdurcModel) {
        // TODO: Validate directives 

        const sourceDirective = model.directives.find(x => x.name === 'source');

        const source = sourceDirective
            ? this.options.sources.get(sourceDirective.args.name as string)
            : this._defaultSource;

        if (!source) {
            throw new Error(`Error loading model ${model.name}: Source not registered`);
        }

        this._models.push(model);
        this._mapModelsByName.set(model.name, model);
        this._mapModelSource.set(model.name, source);
    }
}