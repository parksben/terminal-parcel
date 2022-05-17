import components from './sugar';

export default function parseSyntax(text: string) {
  let result = text;

  try {
    for (const { tag, interpreter } of components) {
      const patt = new RegExp(`\<${tag}([^>]*?)>([^<]*?)<\/${tag}>`, 'i');
      const pattSelfColsing = new RegExp(`<${tag}([^>]*?)\/>`, 'i');

      const handler = (
        _match: string,
        properties: string,
        children: string
      ) => {
        return interpreter(parseProps(properties), children || '');
      };

      while (patt.test(result)) {
        result = result.replace(patt, handler);
      }

      while (pattSelfColsing.test(result)) {
        result = result.replace(pattSelfColsing, handler);
      }
    }
  } catch (e) {
    result = text;
  }

  return result;
}

function parseProps(text: string) {
  const result: Record<string, string> = {};

  try {
    const strList = text.trim().split(/(?<=")\s(?=\w)/g);
    const patt = /^([^=]+)="([^"]+)"$/;

    for (const str of strList) {
      const matched = str.match(patt) || [];
      const propKey = matched[1] || '';
      const propVal = matched[2] || '';
      if (propKey) {
        result[propKey] = propVal;
      }
    }
  } catch (e) {}

  return result;
}
