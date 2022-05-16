const { print, table } = require('../dist'); // const { print } = require('terminal-parcel');

const matrix = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
  [13, 14, 15, 16],
];

// print a table from matrix
print(table.fromMatrix(matrix, { transpose: true }));
