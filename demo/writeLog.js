const path = require('path');
const { Log } = require('../dist'); // const { Log } = require('terminal-parcel');

const log = new Log({ file: path.resolve(__dirname, './log.txt') });

for (let i = 0; i < 300; i++) {
  log.add(`do some thing...`);
}

log.save();
