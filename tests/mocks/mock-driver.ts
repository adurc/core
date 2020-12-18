import { AdurcReadProjection } from '../../src/interfaces/client/read';
import { AdurcDriver } from '../../src/interfaces/driver';

const mockDriver: AdurcDriver = {
    aggregate: () => null,
    create: () => null,
    delete: () => null,
    read: (_projection: AdurcReadProjection) => null,
    update: () => null,
};

export default mockDriver;