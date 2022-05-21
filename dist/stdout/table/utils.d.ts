export declare type TableDataFromRecord = Record<string, string> | Record<string, string>[];
export declare function recordToMatrix(record: TableDataFromRecord): string[][];
export declare function transposeMatrix(data: Array<unknown[]>): unknown[][];
