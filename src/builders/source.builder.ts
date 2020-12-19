import { BuilderGeneratorFunction, BuilderStage } from '../interfaces/builder.generator';
import { AdurcDriver } from '../interfaces/driver';

export class SourceBuilder {

    private name: string;
    private driver: AdurcDriver;

    private constructor() {
        this.name = null;
        this.driver = null;
    }

    public withName(name: string): SourceBuilder {
        this.name = name;
        return this;
    }

    public withDriver(driver: AdurcDriver): SourceBuilder {
        this.driver = driver;
        return this;
    }

    public generator(): BuilderGeneratorFunction {
        const name = this.name;
        const driver = this.driver;

        if (!this.name) {
            throw new Error('Required name for register source');
        }
        if (!this.driver) {
            throw new Error('Required driver for register source');
        }

        return async function* SourceGenerator(builder) {
            builder.sources.push({
                name,
                driver,
            });

            yield BuilderStage.OnInit;

            await driver.init();
        };

    }

    public static use(): SourceBuilder {
        return new SourceBuilder();
    }
}