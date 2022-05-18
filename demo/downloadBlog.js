const fs = require('fs');
const path = require('path');
const { Workflow, print } = require('../dist'); // const { print } = require('terminal-parcel');
const { fetchBlogList, fetchBlogContent } = require('./utils'); // the async methods to fetch data

const workflow = new Workflow('Data acquisition for my blog');

// Step1: fetch the blog list
workflow.add('Fetch list...', async () => {
  return await fetchBlogList();
});

// Step2: fetch contents from the blog list fetched by the previous step
workflow.add('Fetch contents...', async (list) => {
  const requests = list.map((blog) => fetchBlogContent(blog));
  return await Promise.all(requests);
});

// Step3: save the data of blogs to a local file
workflow.add('Save data to file...', (data) => {
  const filePath = path.resolve('./blog.json');
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  print(`=> ${filePath}`, true);
});

// start the workflow
workflow.start();
