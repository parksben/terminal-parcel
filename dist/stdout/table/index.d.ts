import { TableDataFromRecord } from './utils';
export interface TableOptions {
    transpose?: boolean;
    headerAlias?: Record<string, string>;
    headerHighlight?: boolean;
    renderCell?: (value: string, record: Record<string, string | number>, field: string, alias?: string | undefined) => string;
    minColWidth?: number;
    borderHorizontal?: string;
    borderVertical?: string;
    borderCorner?: string;
}
export declare function fromRecord(record: TableDataFromRecord, options?: TableOptions): string;
export declare function fromMatrix(data: string[][], options?: TableOptions): string;
