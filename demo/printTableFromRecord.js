const { print, table } = require('../dist'); // const { print } = require('terminal-parcel');

const record = {
  type: 'animal',
  name: 'dog',
  age: 8,
};

// print a table from object
print(table.fromRecord(record));
