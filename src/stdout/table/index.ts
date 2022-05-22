import cloneDeep from 'lodash.clonedeep';
import renderTable, { TableConfig } from './renderTable';
import { TableDataFromRecord, recordToMatrix } from './utils';

export interface RecordTableConfig extends TableConfig {
  headerAlias?: Record<string, string>;
  headerHighlight?: boolean;
  renderCell?: (
    value?: unknown,
    record?: Record<string, string | number>,
    field?: string,
    alias?: string,
    rowIndex?: number,
    columnIndex?: number
  ) => string;
}

export function fromRecord(
  record: TableDataFromRecord,
  config?: RecordTableConfig
) {
  const data = recordToMatrix(record);

  const {
    headerAlias,
    headerHighlight = true,
    renderCell,
    ...others
  } = config || {};

  // apply the `renderCell` method which is customized by the user
  if (typeof renderCell === 'function') {
    for (let cn = 0; cn < data[0].length; cn++) {
      const field = data[0][cn];
      const alias = (headerAlias || {})[field];
      for (let rn = 1; rn < data.length; rn++) {
        const record: Record<string, string | number> = {};
        data[0].forEach((field: string, col: number) => {
          record[field] = data[rn][col];
        });
        data[rn][cn] = renderCell(data[rn][cn], record, field, alias, rn, cn);
      }
    }
  }

  // rename table header
  if (headerAlias && Object.keys(headerAlias || {}).length && data[0]) {
    data[0] = data[0].map((x: string) => headerAlias[x] || x);
  }

  // highlight table header
  if (headerHighlight && data[0]) {
    data[0] = data[0].map(
      (x: string) => `<color code="notice.bold" spec="table">${x}</color>`
    );
  }

  return fromMatrix(data, others);
}

export interface MatrixTableConfig extends TableConfig {
  renderCell?: (
    value?: unknown,
    rowIndex?: number,
    columnIndex?: number
  ) => string;
}

export function fromMatrix(data: unknown[][], config?: MatrixTableConfig) {
  const { renderCell, ...others } = config || {};

  const dataCopy = cloneDeep(data);

  // apply the `renderCell` method which is customized by the user
  if (typeof renderCell === 'function') {
    for (let rn = 0; rn < dataCopy.length; rn++) {
      for (let cn = 0; cn < dataCopy[rn].length; cn++) {
        dataCopy[rn][cn] = renderCell(dataCopy[rn][cn], rn, cn);
      }
    }
  }

  return renderTable(dataCopy, others);
}
