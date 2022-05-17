const { Workflow, print } = require('../dist');

const workflow = new Workflow(
  'One simulation for the process of data acquisition'
);

workflow.add('Fetch blog list...', async () => {
  await sleep(3000);
  return [
    {
      title: 'How to create a fantasy automation tool in node.js',
      author: 'Bill Clon',
      date: '2020/02/06',
    },
    {
      title: 'What is `terminal-parcel`?',
      author: 'Martin James',
      date: '2020/04/01',
    },
  ];
});

workflow.add('Fetch blog contents...', async (list) => {
  await sleep(5000);
  print('list', list);
  return list.map((x) => ({
    ...x,
    content: 'Blah blah blah blah blah...',
  }));
});

workflow.run().then(() => {
  print('-> Data has been written to `./blog-data.json`.');
});

function sleep(timing) {
  return new Promise((res) => setTimeout(res, timing));
}
