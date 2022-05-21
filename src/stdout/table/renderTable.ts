import { table, getBorderCharacters } from 'table';
import { TableUserConfig } from 'table/dist/src/types/api';
import parseSyntax from '../parseSyntax';
import { transposeMatrix } from './utils';

export interface TableConfig extends TableUserConfig {
  useSyntax?: boolean;
  transpose?: boolean;
}

const DEFAULT_CONFIG = {
  useSyntax: true,
  transpose: false,
  border: getBorderCharacters('norc'),
};

export default function renderTable(
  userData: unknown[][],
  userConfig?: TableConfig
) {
  const { transpose, useSyntax, ...others } = {
    ...DEFAULT_CONFIG,
    ...(userConfig || {}),
    border: {
      ...DEFAULT_CONFIG.border,
      ...((userConfig || {}).border || {}),
    },
  };

  let data = transpose ? transposeMatrix(userData) : userData;

  if (useSyntax) {
    data = data.map((row: unknown[]) =>
      row.map((cell: unknown) => parseSyntax(String(cell)))
    );
  }

  return table(data, others).replace(/(\n|\r)*?$/, '');
}
