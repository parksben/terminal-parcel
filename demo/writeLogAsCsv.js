const path = require('path');
const { Log } = require('../dist'); // const { Log } = require('terminal-parcel');
const { mockName, mockGender, mockAge, mockScore } = require('./utils');

const formatter = (record) =>
  [record.name, record.gender, record.age, record.score].join(',');

const log = new Log({
  file: path.resolve(__dirname, './log.csv'),
  formatter,
});

log.add('姓名,性别,年龄,成绩', false);

for (let i = 0; i < 50; i++) {
  log.add({
    name: mockName(),
    gender: mockGender(),
    age: mockAge(),
    score: mockScore(),
  });
}

log.save();
