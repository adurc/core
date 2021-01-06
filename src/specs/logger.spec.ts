import { IAdurcLogger } from '../interfaces/logger';
import { AdurcLogger } from '../logger';

class MockLogger implements IAdurcLogger {
    public data: { level: string, message: string, context?: unknown }[] = [];

    debug(message: string, context?: unknown): void {
        this.data.push({ level: 'debug', message, context });
    }
    info(message: string, context?: unknown): void {
        this.data.push({ level: 'info', message, context });
    }
    warn(message: string, context?: unknown): void {
        this.data.push({ level: 'warn', message, context });
    }
    error(message: string, context?: unknown): void {
        this.data.push({ level: 'error', message, context });
    }

}

describe('logger tests', () => {
    let mockLogger: MockLogger;
    let logger: AdurcLogger;

    beforeEach(() => {
        mockLogger = new MockLogger();
        logger = new AdurcLogger();
        logger.setLogger(mockLogger);
    });

    it('write in debug level', () => {
        logger.setLogLevel('debug');

        logger.debug('debug');
        logger.info('info');
        logger.warn('warn');
        logger.error('error');

        expect(mockLogger.data).toEqual([
            { level: 'debug', message: 'debug', context: undefined },
            { level: 'info', message: 'info', context: undefined },
            { level: 'warn', message: 'warn', context: undefined },
            { level: 'error', message: 'error', context: undefined },
        ]);
    });

    it('write in info level', () => {
        logger.setLogLevel('info');

        logger.debug('debug');
        logger.info('info');
        logger.warn('warn');
        logger.error('error');

        expect(mockLogger.data).toEqual([
            { level: 'info', message: 'info', context: undefined },
            { level: 'warn', message: 'warn', context: undefined },
            { level: 'error', message: 'error', context: undefined },
        ]);
    });

    it('write in warn level', () => {
        logger.setLogLevel('warn');

        logger.debug('debug');
        logger.info('info');
        logger.warn('warn');
        logger.error('error');

        expect(mockLogger.data).toEqual([
            { level: 'warn', message: 'warn', context: undefined },
            { level: 'error', message: 'error', context: undefined },
        ]);
    });

    it('write in error level', () => {
        logger.setLogLevel('error');

        logger.debug('debug');
        logger.info('info');
        logger.warn('warn');
        logger.error('error');

        expect(mockLogger.data).toEqual([
            { level: 'error', message: 'error', context: undefined },
        ]);
    });
});