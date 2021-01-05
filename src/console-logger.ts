import { IAdurcLogger } from './interfaces/logger';

const buildSafeReplacer = () => {
    const cache = [];
    return (key, value) =>
        typeof value === 'object' && value !== null
            ? cache.includes(value)
                ? undefined // Duplicate reference found, discard key
                : cache.push(value) && value // Store value in our collection
            : value;
};

export class AdurcConsoleLogger implements IAdurcLogger {

    private now(): string {
        const time = new Date();
        const hour = time.getHours().toString().padStart(2, '0');
        const minute = time.getMinutes().toString().padStart(2, '0');
        const seconds = time.getSeconds().toString().padStart(2, '0');
        const miliseconds = time.getMilliseconds().toString();
        return `[${hour}:${minute}:${seconds}.${miliseconds}]`;
    }

    private print(color: number, message: string, context?: unknown) {
        const contextPrint = context ? '\n\t' + JSON.stringify(context, buildSafeReplacer()) : '';
        process.stdout.write(`\x1b[${color}m${this.now()} ${message}\x1b[0m${contextPrint}`);
    }

    debug(message: string, context?: unknown): void {
        this.print(0, message, context);
    }
    info(message: string, context?: unknown): void {
        this.print(34, message, context);
    }
    warn(message: string, context?: unknown): void {
        this.print(33, message, context);
    }
    error(message: string, context?: unknown): void {
        this.print(31, message, context);
    }

}