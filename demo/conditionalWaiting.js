const fs = require('fs');
const path = require('path');
const { Workflow, print, waitFor } = require('../dist'); // const { waitFor } = require('terminal-parcel');

const workflow = new Workflow();

workflow.add(
  'wait for the creation of one directory and then save one file in it',
  async () => {
    const fileDir = path.resolve(__dirname, './test/');

    const isDirExisting = await waitFor(() => fs.existsSync(fileDir), {
      timeout: 30 * 1000,
    });

    if (isDirExisting) {
      const filePath = path.resolve(fileDir, './hello.txt');
      fs.writeFileSync(filePath, 'Hello World!', 'utf8');
      print(`=> ${filePath}`);
    }
  }
);

workflow.exec();
