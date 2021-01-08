import camelcase from 'camelcase';
import { AdurcLogger } from '../logger';
import { Adurc } from './client';
import { AdurcDirectiveDefinition } from './directive-definition';
import { AdurcMiddleware } from './middleware';
import { AdurcField, AdurcModel } from './model';
import { AdurcSource } from './source';

export type AdurcModelBuilder = Omit<AdurcModel, 'accessorName' | 'fields'> & { fields: Omit<AdurcField, 'accessorName'>[] };

export interface AdurcSchema {
    sources: ReadonlyArray<AdurcSource>;
    models: ReadonlyArray<AdurcModel>;
    directives: ReadonlyArray<AdurcDirectiveDefinition>;
    middlewares: ReadonlyArray<AdurcMiddleware>;
}

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

    public addModel(model: AdurcModelBuilder): AdurcSchemaBuilder {
        const exists = this._models.findIndex(x => x.source === model.source && x.name === model.name) >= 0;
        if (exists) {
            return;
        }
        this._models.push({
            ...model,
            accessorName: camelcase(model.name),
            fields: model.fields.map(x => ({
                ...x,
                accessorName: camelcase(x.name),
            })),
        });
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
