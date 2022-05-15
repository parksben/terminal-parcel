import parseSyntax from './parseSyntax';
import { fromRecord } from './table';

export default function print(text: string, useSyntax?: boolean) {
  let output = text;

  if (typeof text === 'object' && Object.keys(text).length) {
    output = fromRecord(text, {
      transpose: true,
      borderHorizontal: '',
      borderVertical: '',
      borderCorner: '',
    });
  }

  if (!useSyntax) {
    // remove tags spec for the table rendering
    output = output.replace(
      /<status[^>]*?spec="table"[^>]*?>([^<]*?)<\/status>/gi,
      '$1'
    );
  }

  process.stdout.write(useSyntax ? parseSyntax(output) : output);
  process.stdout.write('\n');
}
