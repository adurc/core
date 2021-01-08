
import { AdurcClientBuilder } from './client-proxy-builder';
import { BuilderGenerator, BuilderGeneratorFunction, BuilderStage } from './interfaces/builder.generator';
import { Adurc } from './interfaces/client';
import { AdurcModelUntyped } from './interfaces/client/model';
import { IAdurcLogger, LogLevel } from './interfaces/logger';
import { AdurcSchemaBuilder } from './schema.builder';

export class AdurcBuilder {

    private _builders: BuilderGeneratorFunction[];

    private _context: AdurcSchemaBuilder;

    constructor() {
        this._builders = [];
        this._context = new AdurcSchemaBuilder();
    }

    public setLogger(logger: IAdurcLogger): AdurcBuilder {
        this._context.logger.setLogger(logger);
        return this;
    }

    public setLogLevel(level: LogLevel): AdurcBuilder {
        this._context.logger.setLogLevel(level);
        return this;
    }

    public use(builder: BuilderGeneratorFunction): AdurcBuilder {
        this._builders.push(builder);
        return this;
    }

    public async build<T = Record<string, AdurcModelUntyped>>(): Promise<Adurc<T>> {

        const generators: BuilderGenerator[] = [];
        const proxyClient = new AdurcClientBuilder(this._context);
        
        for (const builder of this._builders) {
            const result = builder(this._context);
            if (result instanceof Object) {
                if ('then' in result) {
                    await result;
                } else if ('next' in result) {
                    generators.push(result);
                }
            }
        }

        const stages: BuilderGenerator[][] = new Array(3);
        stages[0] = generators;
        stages[BuilderStage.OnInit] = [];
        stages[BuilderStage.OnAfterInit] = [];

        for (let i = 0; i < stages.length; i++) {
            const registers = stages[i];
            let register: BuilderGenerator;

            this._context.logger.debug('[adurc] builder stage: ' + BuilderStage[i]);

            const stage = i as BuilderStage;

            if (stage === BuilderStage.OnInit) {
                this._context.logger.debug('[adurc] validating context');
                this.validateContext();
                this._context.logger.debug('[adurc] generating proxy client');
                this._context.setAdurc(proxyClient.generateProxyClient());
            }

            while ((register = registers.shift())) {
                const iterator = await register.next();
                if (!iterator.done && i !== BuilderStage.OnAfterInit) {
                    let nextStage = (i + 1) as BuilderStage;
                    if (iterator.value) {
                        nextStage = iterator.value;
                        if (nextStage <= i) {
                            throw new Error('Register exception trying go to old stage');
                        }
                    }
                    stages[nextStage].push(register);
                }
            }
        }

        return this._context.adurc as unknown as Adurc<T>;
    }

    private validateContext() {
        const errors: string[] = [];
        for (const model of this._context.models) {
            const source = this._context.sources.find(x => x.name === model.source);
            if (!source) {
                errors.push(`Model ${model.name} is in source ${model.source} but not found in context`);
            }
            for (const directive of model.directives) {
                const definition = this._context.directives.find(x => x.provider === directive.provider && x.name === directive.name);

                if (!definition) {
                    errors.push(`Model ${model.name} has unknown directive ${directive.name} of provider ${directive.provider}`);
                    continue;
                }

                if (definition.composition !== 'model') {

                    errors.push(`Model ${model.name} has directive ${directive.name} of provider ${directive.provider} on model, but this is restricted to ${definition.composition}`);
                }

                for (const argDefName in definition.args) {
                    const argDef = definition.args[argDefName];
                    const arg = directive.args[argDefName];
                    if ((arg === undefined || arg === null) && argDef.nonNull === true) {
                        errors.push(`Model ${model.name} has directive ${directive.name} of provider ${directive.provider} without required argument ${argDefName}`);
                    }
                    if (arg !== null && arg !== undefined) {
                        if (typeof argDef.type === 'string') {
                            switch (argDef.type) {
                                case 'boolean':
                                    if (typeof arg !== 'boolean') {
                                        errors.push(`Model ${model.name} has directive ${directive.name} of provider ${directive.provider}, unexpected argument type`);
                                    }
                                    break;
                                // TODO: Add other types
                            }
                        }
                    }
                }
            }
        }
        if (errors.length > 0) {
            throw new Error('Error in adurc context:\n' + errors.map(x => `\t - ${x}`).join('\n'));
        }
    }
}