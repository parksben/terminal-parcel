import renderTable from './renderTable';
import { TableDataFromRecord, recordToMatrix, transposeMatrix } from './utils';

export interface TableOptions {
  transpose?: boolean;
  headerAlias?: Record<string, string>;
  headerHighlight?: boolean;
  renderCell?: (
    value: string,
    record: Record<string, string | number>,
    field: string,
    alias?: string | undefined
  ) => string;
  minColWidth?: number;
  borderHorizontal?: string;
  borderVertical?: string;
  borderCorner?: string;
}

export function fromRecord(
  record: TableDataFromRecord,
  options?: TableOptions
) {
  const data = recordToMatrix(record);

  const {
    headerAlias,
    headerHighlight = true,
    renderCell,
    transpose = false,
  } = options || {};

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
        data[rn][cn] = renderCell(data[rn][cn], record, field, alias);
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
      (x: string) => `<status type="notice.bold" spec="table">${x}</status>`
    );
  }

  // insert the border bottom of table header
  if (!transpose && data[0]) {
    data.splice(
      1,
      0,
      data[0].map(() => '{{borderXSymbol}}')
    );
  }

  return fromMatrix(data, options);
}

export function fromMatrix(data: string[][], options?: TableOptions) {
  const {
    transpose = false,
    minColWidth,
    borderHorizontal,
    borderVertical,
    borderCorner,
  } = options || {};

  return renderTable({
    rows: transpose ? transposeMatrix(data) : data,
    minColWidth,
    borderHorizontal,
    borderVertical,
    borderCorner,
  });
}
