const { print, table } = require('../dist'); // const { print } = require('terminal-parcel');

print('1. print a table from the object list:');

const recordList = [
  { name: 'Jhonson', gender: 'male', age: 18, score: 'B+' },
  { name: 'Diana', gender: 'female', age: 19, score: 'A' },
  { name: 'Martin', gender: 'male', age: 20, score: 'B' },
  { name: 'Jacos', gender: 'male', age: 17, score: 'A-' },
];

print(table.fromRecord(recordList));

print(
  "2. translate table contents and highlight rows that contains score likes 'A':"
);

const headerAlias = {
  name: '姓名',
  gender: '性别',
  age: '年龄',
  score: '成绩',
};

const renderCell = (value, record, field, alias) => {
  let text = value;

  // translate the column named 'gender'
  if (field === 'gender') {
    text = text === 'male' ? '男' : '女';
  }

  // highlight rows that contains score likes 'A'
  if (/A/.test(record.score)) {
    text = `<color code="yellow.bold">${text}</color>`;
  }

  return text;
};

print(
  table.fromRecord(recordList, {
    headerAlias, // config the header alias
    renderCell, // custom cell rendering effects
  })
);
