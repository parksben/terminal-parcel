import clearTags from '../clearTags';

type Row = string[];

export interface TableConfig {
  rows: Row[];
  minColWidth?: number;
  borderHorizontal?: string;
  borderVertical?: string;
  borderCorner?: string;
}

export default function renderTable({
  rows,
  minColWidth = 5,
  borderHorizontal = '-',
  borderVertical = '|',
  borderCorner = '+',
}: TableConfig) {
  const colWidth: Record<number, number> = {};

  const pattDoubleByte = /[^\x00-\xff]/g;

  const calColumnWidth = (cn: number) => {
    if (!colWidth[cn]) {
      const widthList = rows.map(
        (row) =>
          clearTags(String(row[cn]))
            .replace('{{borderXSymbol}}', '')
            .replace(pattDoubleByte, 'dd').length + 2
      );
      colWidth[cn] = Math.max(...widthList, minColWidth);
    }
    return colWidth[cn];
  };

  const borderTop = rows[0].map(() => '{{borderXSymbol}}');
  const renderRows = borderHorizontal ? [borderTop, ...rows, borderTop] : rows;

  const lines = renderRows.map((r) => {
    const line = r
      .map((c, n) => {
        const td =
          c === '{{borderXSymbol}}'
            ? `${borderCorner}${new Array(calColumnWidth(n))
                .fill(borderHorizontal)
                .join('')}`
            : `${borderVertical} ${c}${new Array(
                calColumnWidth(n) -
                  clearTags(String(c)).replace(pattDoubleByte, 'dd').length -
                  1
              )
                .fill(' ')
                .join('')}`;
        return td;
      })
      .join('');

    return `${line}${
      r.includes('{{borderXSymbol}}') ? borderCorner : borderVertical
    }`;
  });

  return lines.join('\n');
}
