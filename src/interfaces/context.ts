import camelcase from 'camelcase';
import { AdurcLogger } from '../logger';
import { Adurc } from './client';
import { AdurcDirectiveDefinition } from './directive-definition';
import { AdurcModel } from './model';
import { AdurcSource } from './source';

export type AdurcModelBuilder = Omit<AdurcModel, 'accessorName'>;

export class AdurcContextBuilder {
    private _sources: AdurcSource[];
    private _models: AdurcModel[];
    private _directives: AdurcDirectiveDefinition[];
    private _adurc: Adurc;

    public readonly logger: AdurcLogger;
    public get sources(): ReadonlyArray<AdurcSource> { return this._sources; }
    public get models(): ReadonlyArray<AdurcModel> { return this._models; }
    public get directives(): ReadonlyArray<AdurcDirectiveDefinition> { return this._directives; }
    public get adurc(): Adurc | null { return this._adurc; }

    public addSource(source: AdurcSource): AdurcContextBuilder {
        const exists = this._sources.findIndex(x => x.name === source.name) >= 0;
        if (exists) {
            throw new Error(`Source '${source.name}' already registered`);
        }
        this._sources.push(source);
        return this;
    }

    public addModel(model: AdurcModelBuilder): AdurcContextBuilder {
        const exists = this._models.findIndex(x => x.source === model.source && x.name === model.name) >= 0;
        if (exists) {
            throw new Error(`Model '${model.name}' of source '${model.source}' already registered`);
        }
        this._models.push({ ...model, accessorName: camelcase(model.name) });
        return this;
    }

    public addDirective(directive: AdurcDirectiveDefinition): AdurcContextBuilder {
        const exists = this._directives.findIndex(x => x.provider === directive.provider && x.name === directive.name) >= 0;
        if (exists) {
            throw new Error(`Directive '${directive.name} of provider '${directive.provider}' already registered`);
        }
        this._directives.push(directive);
        return this;
    }

    public setAdurc(adurc: Adurc): AdurcContextBuilder {
        this._adurc = adurc;
        return this;
    }

    constructor() {
        this.logger = new AdurcLogger();
        this._sources = [];
        this._models = [];
        this._directives = [];
    }
}
