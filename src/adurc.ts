import { AdurcContext } from './interfaces/context';
import Driver, { CRUDA, IDriverAggregateRes, IDriverCreateUpdateRes, TDriverDeleteRes, TDriverReadRes } from './bedrock/driver';
import { AdurcDirectiveDefinition, AdurcModel } from './interfaces/model';
import { AdurcOptions } from './interfaces/options';
import { ProjectionInfo } from './interfaces/projection';
import Logger from './logger';
const log = Logger('core:server');

export class Adurc {
    private _defaultSource: Driver;
    private _models: AdurcModel[] = [];
    private _mapModelsByName: Map<string, AdurcModel> = new Map();
    private _mapModelSource: Map<string, Driver> = new Map();
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
        log.info('Initializing server.');
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
            driver.setContext(this._dsContext);
            await driver.init();
        }
    }

    public async createMany(projection: ProjectionInfo): Promise<IDriverCreateUpdateRes> {
        log.info('CreateMany called');
        return await this.execute('create', projection) as IDriverCreateUpdateRes;
    }

    public async createOne(projection: ProjectionInfo): Promise<IDriverCreateUpdateRes> {
        log.info('createOne called');
        return await this.execute('create', projection) as IDriverCreateUpdateRes;
    }

    public async read(projection: ProjectionInfo): Promise<TDriverReadRes> {
        log.info('read called');
        return await this.execute('read', projection) as TDriverReadRes;
    }

    public async readByPK(projection: ProjectionInfo): Promise<Record<string, unknown> | null> {
        log.info('readByPK called');
        const where: Record<string, unknown> = {};
        for (const arg in projection.args) {
            where[arg] = { _eq: projection.args[arg] };
        }
        projection.args = { where };
        const result = await this.execute('read', projection) as TDriverReadRes;
        if (result.length > 0) {
            return result[0];
        } else {
            return null;
        }
    }

    public async updateMany(projection: ProjectionInfo): Promise<IDriverCreateUpdateRes> {
        return await this.execute('update', projection) as IDriverCreateUpdateRes;
    }

    public async updateByPK(projection: ProjectionInfo): Promise<IDriverCreateUpdateRes> {
        return await this.execute('update', projection) as IDriverCreateUpdateRes;
    }

    public async deleteMany(projection: ProjectionInfo): Promise<TDriverDeleteRes> {
        return await this.execute('delete', projection) as TDriverDeleteRes;
    }

    public async deleteByPK(projection: ProjectionInfo): Promise<TDriverDeleteRes> {
        return await this.execute('delete', projection) as TDriverDeleteRes;
    }

    public async aggregate(projection: ProjectionInfo): Promise<IDriverAggregateRes> {
        return await this.execute('aggregate', projection) as IDriverAggregateRes;
    }

    private async execute(method: CRUDA, projection: ProjectionInfo) {
        log.info(`Executing method: '${method}' for model name '${projection.name}'`);
        const model = this.getModel(projection.name);
        const driver = this.getModelDriver(model.name);

        return await driver[method](projection);
    }

    private getModel(name: string): AdurcModel {
        const model = this._mapModelsByName.get(name);

        if (!model) {
            throw new Error(`Model ${name} not registered`);
        }

        return model;
    }

    private getModelDriver(modelName: string): Driver {
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