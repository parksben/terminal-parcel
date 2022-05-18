export interface WaitForCondition {
    (): boolean;
}
export interface WaitForOptions {
    timeout?: number;
    timeoutMsg?: string;
    interval?: number;
}
export default function waitFor(condition: WaitForCondition, options: WaitForOptions): Promise<unknown>;
