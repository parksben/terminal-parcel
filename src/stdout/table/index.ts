import renderTable from './renderTable';
import { TableDataFromRecord, recordToMatrix, transposeMatrix } from './utils';

export interface TableOptions {
  transpose?: boolean;
  headerMapping?: Record<string, string>;
  headerHighlight?: boolean;
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
    headerMapping,
    headerHighlight = true,
    transpose = false,
  } = options || {};

  // rename table header
  if (headerMapping && Object.keys(headerMapping || {}).length && data[0]) {
    data[0] = data[0].map((x: string) => headerMapping[x] || x);
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
