import { Adurc } from './adurc';
import { BuilderGenerator, BuilderGeneratorFunction, BuilderStage } from './interfaces/builder.generator';
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

    public async build(): Promise<Adurc> {
        const stages: BuilderGenerator[][] = new Array(3);

        stages[0] = [...this._builders.map(x => x(this._context))];
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

        return this._context.adurc;
    }
}