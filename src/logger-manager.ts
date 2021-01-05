import { AdurcConsoleLogger } from './console-logger';
import { IAdurcLogger, LogLevel } from './interfaces/logger';

export class AdurcLoggerManager implements IAdurcLogger {

    private level: number;
    private logger: IAdurcLogger;

    constructor() {
        this.setLogger(new AdurcConsoleLogger());
        this.setLogLevel('info');
    }

    setLogLevel(logLevel: LogLevel): void {
        switch (logLevel) {
            case 'debug':
                this.level = 0;
                break;
            case 'info':
                this.level = 10;
                break;
            case 'warn':
                this.level = 20;
                break;
            case 'error':
                this.level = 30;
                break;
        }
    }

    setLogger(logger: IAdurcLogger): void {
        this.logger = logger;
    }

    debug(message: string, context?: unknown): void {
        if (this.level <= 0) {
            this.logger.debug(message, context);
        }
    }
    info(message: string, context?: unknown): void {
        if (this.level <= 10) {
            this.logger.info(message, context);
        }
    }
    warn(message: string, context?: unknown): void {
        if (this.level <= 20) {
            this.logger.warn(message, context);
        }
    }
    error(message: string, context?: unknown): void {
        if (this.level <= 30) {
            this.logger.error(message, context);
        }
    }

}