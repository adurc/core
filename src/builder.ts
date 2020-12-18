import { Adurc } from './adurc';
import { AdurcDirectiveDefinition, AdurcModel } from './interfaces/model';
import { AdurcSource } from './interfaces/source';

export enum RegisterStage {
    OnInit = 1,
    OnAfterInit = 2,
}

export type RegisterGenerator = AsyncGenerator<RegisterStage, void>;
export type RegisterGeneratorFunction = (builder: AdurcBuilder) => RegisterGenerator;

export class AdurcBuilder {

    private _registers: RegisterGeneratorFunction[];

    public sources: AdurcSource[];
    public directives: AdurcDirectiveDefinition[];
    public models: AdurcModel[];

    constructor() {
        this.sources = [];
        this.directives = [];
        this.models = [];
        this._registers = [];
    }

    public use(register: RegisterGeneratorFunction): AdurcBuilder {
        this._registers.push(register);
        return this;
    }

    public async build(): Promise<Adurc> {
        const stages: RegisterGenerator[][] = new Array(3);

        stages[0] = [...this._registers.map(x => x(this))];
        stages[RegisterStage.OnInit] = [];
        stages[RegisterStage.OnAfterInit] = [];

        for (let i = 0; i < stages.length; i++) {
            const registers = stages[i];
            let register: RegisterGenerator;

            while ((register = registers.shift())) {
                const iterator = await register.next();
                if (!iterator.done && i !== RegisterStage.OnAfterInit) {
                    const nextStage = (i + 1) as RegisterStage;
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