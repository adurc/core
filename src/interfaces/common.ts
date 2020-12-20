export type AdurcPrimitive = string | number | boolean;
export type AdurcValue = AdurcPrimitive | AdurcObject<unknown> | AdurcValue[];
export type AdurcObject<T = unknown> = Record<string, T>;
export type AdurcPrimitiveDefinition = 'id' | 'string' | 'int' | 'uuid' | 'float' | 'boolean' | 'date' | 'buffer';

export function isAdurcPrimitiveType(type: string): boolean {
    return ['id', 'string', 'int', 'uuid', 'float', 'boolean', 'date', 'buffer'].indexOf(type) >= 0;
}