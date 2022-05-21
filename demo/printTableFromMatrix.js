const { print, table } = require('../dist'); // const { print } = require('terminal-parcel');

const matrix = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
  [13, 14, 15, 16],
];

print('1. print a table from matrix:');
print(table.fromMatrix(matrix));

print('2. transpose the table above:');
print(table.fromMatrix(matrix, { transpose: true }));
