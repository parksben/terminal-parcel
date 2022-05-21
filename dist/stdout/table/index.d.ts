import { TableConfig } from './renderTable';
import { TableDataFromRecord } from './utils';
export interface RecordTableConfig extends TableConfig {
    headerAlias?: Record<string, string>;
    headerHighlight?: boolean;
    renderCell?: (value: string, record: Record<string, string | number>, field: string, alias?: string | undefined) => string;
}
export declare function fromRecord(record: TableDataFromRecord, config?: RecordTableConfig): string;
export declare function fromMatrix(data: string[][], config?: TableConfig): string;
