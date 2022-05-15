const { print, refresh } = require('../dist');
const { download } = require('./utils'); // method for simulating download process

const onPending = (ratio) => {
  refresh(`downloding: <progress value="${ratio}" />`, true);
};

const onComplete = () => {
  print('\ncomplete!');
};

download(onPending, onComplete);
