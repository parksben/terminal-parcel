export interface QueueProcessor {
    (data: any, index?: number, total?: number): any;
}
export declare class JobQueue {
    topic?: string;
    concurrency: number;
    sequence: any[];
    processor: QueueProcessor;
    constructor(topic?: string);
    load(sequence: any[], concurrency?: number): void;
    program(processor: QueueProcessor): void;
    exec(): Promise<void>;
}
export default JobQueue;
