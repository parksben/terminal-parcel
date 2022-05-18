const { wait } = require('../dist'); // const { wait } = require('terminal-parcel');

exports.download = function download(onPending, onComplete) {
  let progress = 0;

  return (function downloading() {
    if (typeof onPending === 'function') {
      onPending(progress);
    }

    if (progress < 1) {
      progress += 0.01;

      setTimeout(() => {
        downloading();
      }, 100);
    } else if (typeof onComplete === 'function') {
      onComplete();
    }
  })();
};

exports.fetchBlogList = async function fetchBlogList() {
  await wait(3000);
  return [
    {
      title: 'How to make a fantastic CLI tool in node.js',
      author: 'parksben',
      date: '2020/02/06',
    },
    {
      title: 'Write the automation scripts efficiently in node.js',
      author: 'parksben',
      date: '2020/02/12',
    },
    {
      title: 'What is `terminal-parcel`?',
      author: 'parksben',
      date: '2020/04/01',
    },
  ];
};

exports.fetchBlogContent = async function fetchBlogContent(blogInfo) {
  await wait(3000);
  return {
    ...blogInfo,
    content: 'Blah blah blah blah blah...',
  };
};
