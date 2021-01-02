import { Adurc } from './adurc';
import { BuilderGenerator, BuilderGeneratorFunction, BuilderStage } from './interfaces/builder.generator';
import { AdurcModelUntyped } from './interfaces/client/model';
import { AdurcContextBuilder } from './interfaces/context';


export class AdurcBuilder {

    private _builders: BuilderGeneratorFunction[];

    private _context: AdurcContextBuilder;

    constructor() {
        this._builders = [];
        this._context = {
            directives: [],
            models: [],
            sources: [],
        };
    }

    public use(builder: BuilderGeneratorFunction): AdurcBuilder {
        this._builders.push(builder);
        return this;
    }

    public async build<T = Record<string, AdurcModelUntyped>>(): Promise<Adurc<T>> {

        const generators: BuilderGenerator[] = [];

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

            console.log('[adurc] builder stage: ' + BuilderStage[i]);

            switch (i as BuilderStage) {
                case BuilderStage.OnInit:
                    console.log('[adurc] validating context');
                    // validate models, directives, etc..
                    break;
                case BuilderStage.OnAfterInit:
                    console.log('[adurc] create adurc instance');
                    this._context.adurc = new Adurc({
                        directives: this._context.directives,
                        models: this._context.models,
                        sources: this._context.sources,
                    });
                    break;
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
}