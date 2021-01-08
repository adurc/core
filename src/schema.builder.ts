import { Adurc, AdurcLogger } from '.';
import { AdurcDirectiveDefinition } from './interfaces/directive-definition';
import { AdurcMiddleware } from './interfaces/middleware';
import { AdurcModel, AdurcModelSchema } from './interfaces/model';
import { AdurcSource } from './interfaces/source';
import { AdurcSchemaUtils } from './schema.utils';

export class AdurcSchemaBuilder {
    private _sources: AdurcSource[];
    private _models: AdurcModel[];
    private _directives: AdurcDirectiveDefinition[];
    private _middlewares: AdurcMiddleware[];
    private _adurc: Adurc;

    public readonly logger: AdurcLogger;

    public get sources(): ReadonlyArray<AdurcSource> { return this._sources; }
    public get models(): ReadonlyArray<AdurcModel> { return this._models; }
    public get directives(): ReadonlyArray<AdurcDirectiveDefinition> { return this._directives; }
    public get middlewares(): ReadonlyArray<AdurcMiddleware> { return this._middlewares; }
    public get adurc(): Adurc | null { return this._adurc; }

    public addSource(source: AdurcSource): AdurcSchemaBuilder {
        const exists = this._sources.findIndex(x => x.name === source.name) >= 0;
        if (exists) {
            return;
        }
        this._sources.push(source);
        return this;
    }

    public addModel(model: AdurcModelSchema): AdurcSchemaBuilder {
        const exists = this._models.findIndex(x => x.source === model.source && x.name === model.name) >= 0;
        if (exists) {
            return;
        }

        this._models.push(AdurcSchemaUtils.convertModelSchemaToModel(model));

        return this;
    }

    public addDirective(directive: AdurcDirectiveDefinition): AdurcSchemaBuilder {
        const exists = this._directives.findIndex(x => x.provider === directive.provider && x.name === directive.name) >= 0;
        if (exists) {
            return;
        }
        this._directives.push(directive);
        return this;
    }

    public addMiddleware(middleware: AdurcMiddleware): AdurcSchemaBuilder {
        this._middlewares.push(middleware);
        return this;
    }

    public setAdurc(adurc: Adurc): AdurcSchemaBuilder {
        this._adurc = adurc;
        return this;
    }

    constructor() {
        this.logger = new AdurcLogger();
        this._sources = [];
        this._models = [];
        this._directives = [];
        this._middlewares = [];
    }
}