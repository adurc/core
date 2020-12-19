import { AdurcFindManyArgs } from '../../interfaces/client/find-many.args';
import { AdurcDriver } from '../../interfaces/driver';

const mockDriver: AdurcDriver = {
    init: () => Promise.resolve(),
    aggregate: () => Promise.resolve(null),
    createMany: () => Promise.resolve(null),
    deleteMany: () => Promise.resolve(null),
    findMany: (_args: AdurcFindManyArgs) => Promise.resolve([]),
    updateMany: () => Promise.resolve(null),
};

export default mockDriver;