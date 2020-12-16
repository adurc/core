import { coreDirectives } from './directives';
import { AdurcDirectiveDefinition } from './interfaces/model';
import { Adurc } from './adurc';
import { AdurcIntrospector } from './introspector';
import { AdurcDriver } from './driver';

export class AdurcBuilder {
    private introspectors: AdurcIntrospector[] = [];
    private sources: Map<string, AdurcDriver> = new Map();
    private defaultSource: string | null;
    private directives: AdurcDirectiveDefinition[] = [...coreDirectives];

    private constructor() { /* */ }

    public useSource(name: string, driver: AdurcDriver, asDefault = false): AdurcBuilder {
        if (this.sources.has(name)) {
            throw new Error(`Already registered source with name ${name}`);
        }
        if (asDefault) {
            this.defaultSource = name;
        }
        this.sources.set(name, driver);
        return this;
    }

    public useIntrospector(introspector: AdurcIntrospector): AdurcBuilder {
        this.introspectors.push(introspector);
        return this;
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