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
      url: 'https://www.fakeblog.me/zbsrgtah',
    },
    {
      title: 'Write the automation scripts efficiently in node.js',
      author: 'parksben',
      date: '2020/02/12',
      url: 'https://www.fakeblog.me/tigserew',
    },
    {
      title: 'What is `terminal-parcel`?',
      author: 'parksben',
      date: '2020/04/01',
      url: 'https://www.fakeblog.me/ukzhweya',
    },
  ];
};

exports.fetchBlogContent = async function fetchBlogContent() {
  await wait(3000);
  return 'This is one fake article for the example of methods `Workflow` and `JobQueue`';
};

// generation by `https://www.suijidaquan.com/name-generator`
const NAME_LIST = [
  '剑歆',
  '郑秋明',
  '江枫毅',
  '赵金铎',
  '张银兵',
  '庄员',
  '周鸣',
  '陈开武',
  '张耀昌',
  '曹兴武',
  '余世琼',
  '益嘉',
  '安海丽',
  '郑晓玲',
  '钟旭斌',
  '祝梦雅',
  '张义康',
  '张常荣',
  '詹莉',
  '张峰林',
  '钟明涛',
  '袁钰涵',
  '赵幼兵',
  '钟祥云',
  '董喆',
  '邹晓峰',
  '叶亦健',
  '朱剑楠',
  '郭元伟',
  '殷佳珍',
  '何永年',
  '赵汉伟',
  '赵月义',
  '张克海',
  '朱旭龙',
  '郁斐',
  '李昌才',
  '张华才',
  '张正礼',
  '朱文强',
  '张宇婷',
  '叶远兴',
  '张敦强',
  '支新',
  '赵飞跃',
  '白鹏举',
  '诸君',
  '张显锋',
  '建伶',
  '马玉凡',
  '朱素素',
  '果梨',
  '辛永顺',
  '应亚菲',
  '张安兵',
  '班倩倩',
  '张真和',
  '赵双兰',
  '张泽路',
  '张显义',
];

const GENDER_LIST = ['男', '女'];

const AGE_LIST = new Array(5).fill(12).map((x, i) => x + i);

exports.mockName = function mockName() {
  return randomItem(NAME_LIST);
};

exports.mockGender = function mockGender() {
  return randomItem(GENDER_LIST);
};

exports.mockAge = function mockAge() {
  return randomItem(AGE_LIST);
};

exports.mockScore = function mockScore() {
  return 30 + 0.5 * Math.round(140 * Math.random());
};

function randomItem(list) {
  const index = Math.floor(list.length * Math.random());
  return list[index];
}
