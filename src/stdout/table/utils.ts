export type TableDataFromRecord =
  | Record<string, string>
  | Record<string, string>[];

export function recordToMatrix(record: TableDataFromRecord) {
  if (Array.isArray(record)) {
    const header = Object.keys(record[0] || {});
    const rows = record.map((obj: Record<string, string>) =>
      Object.values(obj || {})
    );

    return [header, ...rows];
  }

  return [Object.keys(record), Object.values(record)];
}

export function transposeMatrix(data: Array<unknown[]>) {
  const result: Array<unknown[]> = [];

  if (data && data[0]) {
    for (let i = 0; i < data[0].length; i++) {
      result[i] = [];
      for (let j = 0; j < data.length; j++) {
        result[i][j] = data[j][i];
      }
    }
  }

  return result;
}
