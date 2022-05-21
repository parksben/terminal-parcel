import { TableConfig } from './renderTable';
import { TableDataFromRecord } from './utils';
export interface RecordTableConfig extends TableConfig {
    headerAlias?: Record<string, string>;
    headerHighlight?: boolean;
    renderCell?: (value?: unknown, record?: Record<string, string | number>, field?: string, alias?: string, rowIndex?: number, columnIndex?: number) => string;
}
export declare function fromRecord(record: TableDataFromRecord, config?: RecordTableConfig): string;
export interface MatrixTableConfig extends TableConfig {
    renderCell?: (value?: unknown, rowIndex?: number, columnIndex?: number) => string;
}
export declare function fromMatrix(data: unknown[][], config?: MatrixTableConfig): string;
