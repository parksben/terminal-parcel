import { TableUserConfig } from 'table/dist/src/types/api';
export interface TableConfig extends TableUserConfig {
    useSyntax?: boolean;
    transpose?: boolean;
}
export default function renderTable(userData: unknown[][], userConfig?: TableConfig): string;
