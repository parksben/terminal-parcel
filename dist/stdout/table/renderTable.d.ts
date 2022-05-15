declare type Row = string[];
export interface TableConfig {
    rows: Row[];
    minColWidth?: number;
    borderHorizontal?: string;
    borderVertical?: string;
    borderCorner?: string;
}
export default function renderTable({ rows, minColWidth, borderHorizontal, borderVertical, borderCorner, }: TableConfig): string;
export {};
