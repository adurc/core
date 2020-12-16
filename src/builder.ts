import { coreDirectives } from './directives';
import Driver from './bedrock/driver';
import { AdurcDirectiveDefinition } from './interfaces/model';
import AdurcIntrospector from './bedrock/introspector';
import { Adurc } from './adurc';
import Logger from './logger';
const log = Logger('core:builder');

export class AdurcBuilder {
    private introspectors: AdurcIntrospector[] = [];
    private sources: Map<string, Driver> = new Map();
    private defaultSource: string | null;
    private directives: AdurcDirectiveDefinition[] = [...coreDirectives];

    private constructor() { /* */ }

    public use(bedrock: AdurcIntrospector | Driver): AdurcBuilder {
        if (!bedrock) throw new Error('ArgumentNull: beedrock');

        log.info(`Bedrock foundation '${bedrock.constructor.name}'.`);


        if (bedrock instanceof AdurcIntrospector) {
            log.info('Detected Introspector, adding it.');
            this.introspectors.push(bedrock as AdurcIntrospector);
            return this;
        }

        if (bedrock instanceof Driver) {
            log.info('Detected Driver, adding it.');
            this.defaultSource = 'main';
            
            if (this.sources.get(this.defaultSource))
                throw new Error('Support for multiple sources broken, fixme.');
            this.sources.set(this.defaultSource, bedrock);

            if (bedrock.directives) {
                bedrock.directives
                    .forEach(x => this.directives.push({ ...x, name: `${bedrock.name}_${x.name}` }));
            }

            return this;
        }

        throw new Error(`Given bedrock foundation '${(bedrock as unknown).constructor.name}' does not extend from a valid class.`);
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