import parseSyntax from './parseSyntax';
import { fromRecord } from './table';

export default function print(
  text: string | Record<string, string>,
  useSyntax?: boolean
) {
  let output = '';

  if (typeof text === 'object' && Object.keys(text).length) {
    output = fromRecord(text, {
      transpose: true,
      borderHorizontal: '',
      borderVertical: '',
      borderCorner: '',
    });
  } else if (typeof text === 'string') {
    output = text;
  }

  if (!useSyntax) {
    // remove tags spec for the table rendering
    output = (output as string).replace(
      /<status[^>]*?spec="table"[^>]*?>([^<]*?)<\/status>/gi,
      '$1'
    );
  }

  process.stdout.write(`${useSyntax ? parseSyntax(output) : output}\n`);
}
