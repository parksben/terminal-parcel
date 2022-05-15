const { print, table } = require('../dist'); // const { print } = require('terminal-parcel');

// print a table from matrix
const matrix = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
  [13, 14, 15, 16],
];
print(table.fromMatrix(matrix, { transpose: true }), true);

// print a table from object
const record = {
  type: 'animal',
  name: 'dog',
  age: 8,
};
print(table.fromRecord(record), true);

// print a table from object list
const recordList = [
  { name: 'Jhonson', gender: 'male', age: 18, score: 'B+' },
  { name: 'Diana', gender: 'female', age: 19, score: 'A' },
  { name: 'Martin', gender: 'male', age: 20, score: 'B' },
];
const headerMapping = {
  name: '姓名',
  gender: '性别',
  age: '年龄',
  score: '成绩',
};
print(
  table.fromRecord(recordList, {
    headerMapping,
    headerHighlight: false,
  }),
  true
);
