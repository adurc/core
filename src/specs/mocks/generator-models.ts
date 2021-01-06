import { AdurcContextBuilder } from '../../interfaces/context';
import MockDriver from './mock-driver';
import { adurcPostModel } from './mock-post-model';
import { adurcProfileModel } from './mock-profile-model';
import { adurcTagModel } from './mock-tags-model';
import { adurcUserModel } from './mock-user-model';

export function MockBuilderGenerator(context: AdurcContextBuilder): void {
    context.addModel(adurcUserModel);
    context.addModel(adurcProfileModel);
    context.addModel(adurcPostModel);
    context.addModel(adurcTagModel);

    context.addSource({
        name: 'mock',
        driver: new MockDriver()
    });

    context.addSource({
        name: 'mock2',
        driver: new MockDriver()
    });
}