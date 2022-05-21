import singleLineLog from 'single-line-log';
import parseSyntax from './parseSyntax';

const log = singleLineLog(process.stdout);

export default function refresh(text: string, useSyntax = true) {
  log(useSyntax ? parseSyntax(text) : text);
}
