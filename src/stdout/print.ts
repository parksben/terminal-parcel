import parseSyntax from './parseSyntax';

export default function print(text: string, useSyntax?: boolean) {
  process.stdout.write(useSyntax ? parseSyntax(text) : text);
  process.stdout.write('\n');
}
