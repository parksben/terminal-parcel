/// <reference types="node" />
export interface RecordFormatter {
    (record: any): string;
}
export declare type LogMode = 'append' | 'refresh';
export interface LogOptions {
    file: string;
    encoding?: BufferEncoding;
    mode?: LogMode;
    formatter?: RecordFormatter;
}
export declare class Log {
    file: string;
    encoding?: BufferEncoding;
    mode: LogMode;
    formatter: RecordFormatter;
    private cache;
    constructor(options: LogOptions);
    add(record: any, useFormatter?: boolean): void;
    save(): void;
}
export default Log;
