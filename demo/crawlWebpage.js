const fs = require('fs');
const path = require('path');
const axios = require('axios').default;
const cheerio = require('cheerio');
const { JobQueue, print } = require('../dist'); // const { JobQueue } = require('terminal-parcel');

// a list used to append version information
const versions = [];

// a list used to record error information
const errors = [];

// one sequence of html page urls
const URL_LIST = [
  'https://nodejs.org/en/blog/year-2011/',
  'https://nodejs.org/en/blog/year-2012/',
  'https://nodejs.org/en/blog/year-2013/',
  'https://nodejs.org/en/blog/year-2014/',
  'https://nodejs.org/en/blog/year-2015/',
  'https://nodejs.org/en/blog/year-2016/',
  'https://nodejs.org/en/blog/year-2017/',
  'https://nodejs.org/en/blog/year-2018/',
  'https://nodejs.org/en/blog/year-2019/',
  'https://nodejs.org/en/blog/year-2020/',
  'https://nodejs.org/en/blog/year-2021/',
  'https://nodejs.org/en/blog/',
];

// create one instance of `JobQueue`
const queue = new JobQueue('Retrieve the release logs of Node.js');

// load one sequence to create the queue jobs
queue.load(URL_LIST, 3); // the number `3` is the count of concurrent jobs

// set the program to process every item of the sequence above
queue.program(async (url) => {
  try {
    // fetch html content from the url
    const html = (await axios.get(url)).data;

    // parse data from html with `cheerio`
    const $ = cheerio.load(html);
    $('.blog-index')
      .find('li')
      .each(function () {
        const linkEl = $(this).children('a');
        const timeEl = $(this).children('time');

        const text = linkEl.text();
        const time = timeEl.attr('datetime');
        const blog = `https://nodejs.org${linkEl.attr('href')}`;

        if (/^Node\sv/.test(text)) {
          // append one record to `versions`
          versions.push({ version: text, time, blog });
        }
      });
  } catch (error) {
    // record the exception to `errors`
    errors.push({ url, error });
  }
});

queue.exec().then(() => {
  // sort versions by time in descending order
  const list = versions.sort((a, b) => Date.parse(b.time) - Date.parse(a.time));

  // save the records as a JSON file
  const filePath = path.resolve(__dirname, './nodejs_version.json');
  fs.writeFileSync(filePath, JSON.stringify(list, null, 2), 'utf8');
  print(`=> ${filePath}`);

  // save the `errors.json` file if any error existing
  if (errors.length > 0) {
    fs.writeFileSync(
      path.resolve(__dirname, './errors.json'),
      JSON.stringify(errors, null, 2),
      'utf8'
    );
  }
});
