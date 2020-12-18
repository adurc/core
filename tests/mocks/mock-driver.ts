import { AdurcFindManyArgs } from '../../src/interfaces/client/find-many.args';
import { AdurcDriver } from '../../src/interfaces/driver';

const mockDriver: AdurcDriver = {
    aggregate: () => null,
    createMany: () => null,
    deleteMany: () => null,
    findMany: (_args: AdurcFindManyArgs) => null,
    updateMany: () => null,
};

export default mockDriver;