const { print, refresh } = require('../dist'); // const { print, refresh } = require('terminal-parcel');
const { download } = require('./utils'); // a method for simulating the download process

const onPending = (ratio) => {
  refresh(`downloding: <progress value="${ratio}" />`);
};

const onComplete = () => {
  print('\ncomplete!');
};

download(onPending, onComplete);
