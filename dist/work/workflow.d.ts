export interface Processor {
    (value: any, index: number, total: number): any;
}
export interface Step {
    index: number;
    description: string;
    processor: Processor;
}
export interface State {
    value: any;
    index: number;
    total: number;
}
export declare class Workflow {
    topic?: string;
    steps: Step[];
    total: number;
    constructor(topic?: string);
    add(description: string, processor: Processor): void;
    exec(): Promise<any>;
}
export default Workflow;
