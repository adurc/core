export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface IAdurcLogger {
    debug(message: string, context?: unknown): void;
    info(message: string, context?: unknown): void;
    warn(message: string, context?: unknown): void;
    error(message: string, context?: unknown): void;
}