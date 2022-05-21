import fs from 'node:fs';
import path from 'path';

export interface RecordFormatter {
  (record: any): string;
}

export type LogMode = 'append' | 'refresh';

export interface LogOptions {
  file: string;
  encoding?: BufferEncoding;
  mode?: LogMode;
  formatter?: RecordFormatter;
}

export class Log {
  file: string;
  encoding?: BufferEncoding;
  mode: LogMode;
  formatter: RecordFormatter;

  private cache: string[];

  constructor(options: LogOptions) {
    const { file, encoding, mode, formatter } = options || {};

    this.file = file;
    this.encoding = encoding;
    this.mode = mode || 'append';

    this.formatter =
      typeof formatter === 'function'
        ? formatter
        : (record: any) => `[${new Date().toISOString()}] ${String(record)}`;

    this.cache = [];
  }

  add(record: any, useFormatter = true) {
    this.cache.push(String(useFormatter ? this.formatter(record) : record));
  }

  save() {
    const filePath = path.resolve(process.cwd(), this.file);
    const content = this.cache.join('\n') + '\n';

    // clear the cache
    this.cache = [];

    // create file if not exists
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, '', { encoding: this.encoding });
    }

    if (this.mode === 'refresh') {
      fs.writeFileSync(filePath, content, { encoding: this.encoding });
    }

    if (this.mode === 'append') {
      fs.appendFileSync(filePath, content, { encoding: this.encoding });
    }
  }
}

export default Log;
