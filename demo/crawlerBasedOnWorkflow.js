const fs = require('fs');
const path = require('path');
const { Workflow, JobQueue, print } = require('../dist'); // const { print } = require('terminal-parcel');
const { fetchBlogList, fetchBlogContent } = require('./utils'); // the fake methods to fetch data

const workflow = new Workflow('Data acquisition for my blog');

// Step1: fetch the blog list
workflow.add('fetch blog list...', async () => {
  return await fetchBlogList();
});

// Step2: fetch contents from the blog list fetched by the previous step
workflow.add('fetch blog detail...', async (list) => {
  const blogs = [];

  const queue = new JobQueue();
  queue.load(list);

  queue.program(async (blogInfo) => {
    const content = await fetchBlogContent(blogInfo.url);
    blogs.push({ ...blogInfo, content });
  });

  await queue.exec();

  return blogs;
});

// Step3: save the data of blogs to a local file
workflow.add('save data as a file...', (data) => {
  const filePath = path.resolve(__dirname, './blog.json');
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  print(`=> ${filePath}`);
});

// run the workflow
workflow.exec();
