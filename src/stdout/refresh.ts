import * as singleLineLog from 'single-line-log';
import parseSyntax from './parseSyntax';

const log = singleLineLog(process.stdout);

export default function refresh(text: string, useSyntax?: boolean) {
  log(useSyntax ? parseSyntax(text) : text);
}
