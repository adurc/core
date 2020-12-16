import Driver, {IDriverAggregateRes, IDriverCreateUpdateRes, TDriverDeleteRes, TDriverReadRes} from '../src/bedrock/driver';
import { AdurcModel } from '../src/interfaces/model';
import AdurcIntrospector from '../src/bedrock/introspector';
import { Adurc } from '../src/adurc';

const mockModel: AdurcModel = {
    name: 'Test',
    directives: [],
    fields: [
        { name: 'id', type: 'ID', nonNull: false, collection: false, directives: [] }
    ],
};

class MockDriver extends Driver {
    name = 'MockDriver';
    directives = [];
    setContext(/* context: DSContext */): void { return; }
    init(): void | Promise<void> { return; }
    async create(/* projection: ProjectionInfoExpand */): Promise<IDriverCreateUpdateRes> {
        return {};
    }
    async read(/* projection: ProjectionInfoExpand */): Promise<TDriverReadRes> {
        return [];
    }
    async update(/* projection: ProjectionInfoExpand */): Promise<IDriverCreateUpdateRes> {
        return {};
    }
    async delete(/* projection: ProjectionInfoExpand */): Promise<TDriverDeleteRes> {
        return;
    }
    async aggregate(/* projection: ProjectionInfoExpand */): Promise<IDriverAggregateRes> {
        return {aggregate: {}};
    }

}

describe('data server tests', () => {
    let adurc: Adurc;
    let mockIntrospector: AdurcIntrospector;
    let mockDriver: Driver;

    beforeEach(async () => {
        mockIntrospector = {
            introspect: () => [mockModel],
        };

        const sources = new Map<string, Driver>();
        sources.set('mock', mockDriver = new MockDriver());

        adurc = new Adurc({
            directives: [],
            introspectors: [mockIntrospector],
            sources,
            defaultSource: 'mock',
        });
    });

    test('call to init driver', async () => {
        mockDriver.init = jest.fn(mockDriver.init.bind(mockDriver));

        await adurc.init();

        expect(mockDriver.init).toHaveBeenCalledTimes(1);
    });

    test('call to setContext driver', async () => {
        mockDriver.setContext = jest.fn(mockDriver.setContext.bind(mockDriver));

        await adurc.init();

        expect(mockDriver.setContext).toHaveBeenCalledTimes(1);
    });


    test('call to introspect', async () => {
        mockIntrospector.introspect = jest.fn(mockIntrospector.introspect.bind(mockIntrospector));

        await adurc.init();

        expect(mockIntrospector.introspect).toHaveBeenCalledTimes(1);

        expect(adurc.models).toStrictEqual([
            mockModel
        ]);
    });

});