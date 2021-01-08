import { AdurcSchemaBuilder } from '../../interfaces/context';
import MockDriver from './mock-driver';
import { adurcPostModel } from './mock-post-model';
import { adurcProfileModel } from './mock-profile-model';
import { adurcTagModel } from './mock-tags-model';
import { adurcUserModel } from './mock-user-model';

export function MockBuilderGenerator(schema: AdurcSchemaBuilder): void {
    schema.addModel(adurcUserModel);
    schema.addModel(adurcProfileModel);
    schema.addModel(adurcPostModel);
    schema.addModel(adurcTagModel);

    schema.addSource({
        name: 'mock',
        driver: new MockDriver()
    });

    schema.addSource({
        name: 'mock2',
        driver: new MockDriver()
    });
}