import { TableDataFromRecord } from './utils';
export interface TableOptions {
    transpose?: boolean;
    headerMapping?: Record<string, string>;
    headerHighlight?: boolean;
    minColWidth?: number;
    borderHorizontal?: string;
    borderVertical?: string;
    borderCorner?: string;
}
export declare function fromRecord(record: TableDataFromRecord, options?: TableOptions): string;
export declare function fromMatrix(data: string[][], options?: TableOptions): string;
