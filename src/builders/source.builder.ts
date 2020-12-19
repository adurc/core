import { BuilderGeneratorFunction, BuilderStage } from '../interfaces/builder.generator';
import { AdurcDriver } from '../interfaces/driver';

export class SourceBuilder {

    public static use(options: { name: string, driver: AdurcDriver }): BuilderGeneratorFunction {
        const { name, driver } = options;
        
        if (!name) {
            throw new Error('Required name for register source');
        }
        if (!driver) {
            throw new Error('Required driver for register source');
        }

        return async function* SourceGenerator(context) {
            context.sources.push({
                name,
                driver,
            });

            await driver.setContext(context);

            yield BuilderStage.OnInit;

            await driver.init();
        };
    }
}