import { Adurc } from './adurc';
import { BuilderGenerator, BuilderGeneratorFunction, BuilderStage } from './interfaces/builder.generator';
import { AdurcDirectiveDefinition, AdurcModel } from './interfaces/model';
import { AdurcSource } from './interfaces/source';

export class AdurcBuilder {

    private _builders: BuilderGeneratorFunction[];

    public sources: AdurcSource[];
    public directives: AdurcDirectiveDefinition[];
    public models: AdurcModel[];

    constructor() {
        this.sources = [];
        this.directives = [];
        this.models = [];
        this._builders = [];
    }

    public use(builder: BuilderGeneratorFunction): AdurcBuilder {
        this._builders.push(builder);
        return this;
    }

    public async build(): Promise<Adurc> {
        const stages: BuilderGenerator[][] = new Array(3);

        stages[0] = [...this._builders.map(x => x(this))];
        stages[BuilderStage.OnInit] = [];
        stages[BuilderStage.OnAfterInit] = [];

        for (let i = 0; i < stages.length; i++) {
            const registers = stages[i];
            let register: BuilderGenerator;

            while ((register = registers.shift())) {
                const iterator = await register.next();
                if (!iterator.done && i !== BuilderStage.OnAfterInit) {
                    const nextStage = (i + 1) as BuilderStage;
                    if (iterator.value) {
                        if (iterator.value <= i) {
                            throw new Error('Register exception trying go to old stage');
                        }
                    }
                    stages[nextStage].push(register);
                }
            }
        }

        // TODO: Pending validate directives
        // TODO: Pending validate sources
        // TODO: Pending validate models

        return new Adurc({
            sources: this.sources,
            directives: this.directives,
            models: this.models,
        });
    }
}