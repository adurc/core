import { AdurcDirectiveDefinition } from './interfaces/model';
import { Adurc } from './adurc';
import { AdurcIntrospector } from './introspector';
import { AdurcDriver } from './driver';

export class AdurcBuilder {
    public introspectors: AdurcIntrospector[];
    public sources: Map<string, AdurcDriver>;
    public defaultSource: string | null;
    public directives: AdurcDirectiveDefinition[];

    private constructor() {
        this.introspectors = [];
        this.sources = new Map();
        this.defaultSource = null;
        this.directives = [];
    }

    public async build(): Promise<Adurc> {
        if (this.introspectors.length === 0) {
            throw new Error('Adurc requires at least one introspector');
        }

        if (this.sources.size === 0) {
            throw new Error('Adurc requires at least one source');
        }

        const adurc = new Adurc({
            introspectors: this.introspectors,
            defaultSource: this.defaultSource ?? this.sources.keys().next().value,
            sources: this.sources,
            directives: this.directives,
        });

        await adurc.init();

        return adurc;
    }

    public static create(): AdurcBuilder {
        return new AdurcBuilder();
    }
}