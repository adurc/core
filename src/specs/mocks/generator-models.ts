import { AdurcContextBuilder } from '../../interfaces/context';
import MockDriver from './mock-driver';
import { adurcPostModel } from './mock-post-model';
import { adurcProfileModel } from './mock-profile-model';
import { adurcTagModel } from './mock-tags-model';
import { adurcUserModel } from './mock-user-model';

export function MockBuilderGenerator(context: AdurcContextBuilder): void {
    context.models.push(adurcUserModel);
    context.models.push(adurcProfileModel);
    context.models.push(adurcPostModel);
    context.models.push(adurcTagModel);

    context.sources.push({
        name: 'mock',
        driver: new MockDriver()
    });

    context.sources.push({
        name: 'mock2',
        driver: new MockDriver()
    });
}