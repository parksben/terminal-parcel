const { print, table } = require('../dist'); // const { print } = require('terminal-parcel');

const matrix = [
  ['SUN', 'MON', 'TUR', 'WED', 'THU', 'FRI', 'SAT'],
  [1, 2, 3, 4, 5, 6, 7],
  [8, 9, 10, 11, 12, 13, 14],
  [15, 16, 17, 18, 19, 20, 21],
  [22, 23, 24, 25, 26, 27, 28],
  [29, 30, 31, '', '', '', ''],
];

print(
  '1. print a table from the matrix and highlight numbers in the range [20,26]:'
);
print(
  table.fromMatrix(matrix, {
    renderCell: (value, rowIdx, colIdx) => {
      if (value >= 20 && value <= 26) {
        return `<color apply="cyan.bold">${value}</color>`;
      }
      if (colIdx === 0 || colIdx === 6) {
        return `<color apply="grey">${value}</color>`;
      }
      return value;
    },
  })
);

print('2. transpose the table and highlight the special row and column:');
print(
  table.fromMatrix(matrix, {
    transpose: true,
    renderCell: (value, rowIdx, colIdx) => {
      if (rowIdx === 2) {
        return `<color apply="red.bold">${value}</color>`;
      }
      if (colIdx === 1) {
        return `<color apply="yellow.bold">${value}</color>`;
      }
      return value;
    },
  })
);
