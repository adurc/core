import { AdurcDriver } from '../src/driver';
import { AdurcModel } from '../src/interfaces/model';
import { Adurc } from '../src/adurc';
import { AdurcIntrospector } from '../src/introspector';
import { IDriverCreateUpdateRes, TDriverReadRes, TDriverDeleteRes, IDriverAggregateRes } from '../src/interfaces/driver';

const mockModel: AdurcModel = {
    name: 'Test',
    directives: [],
    fields: [
        { name: 'id', type: 'ID', nonNull: false, collection: false, directives: [] }
    ],
};

class MockDriver implements AdurcDriver {
    name = 'MockDriver';
    directives = [];
    setContext(/* context: DSContext */): Promise<void> { return; }
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
        return { aggregate: {} };
    }

}

describe('adurc driver tests', () => {
    let adurc: Adurc;
    let mockIntrospector: AdurcIntrospector;
    let mockDriver: AdurcDriver;

    beforeEach(async () => {
        mockIntrospector = {
            introspect: () => [mockModel],
        };

        const sources = new Map<string, AdurcDriver>();
        sources.set('mock', mockDriver = new MockDriver());

        adurc = new Adurc({
            directives: [],
            introspectors: [mockIntrospector],
            sources,
            defaultSource: 'mock',
        });
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