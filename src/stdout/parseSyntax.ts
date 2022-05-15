import components from './sugar';

export default function parseSyntax(text: string) {
  let result = text;

  try {
    for (const { tag, interpreter } of components) {
      const patt = new RegExp(`\<${tag}([^>]*?)\>([^<]*?)\<\/${tag}\>`, 'gi');
      const pattSelfColsing = new RegExp(`\<${tag}([^>]*?)\/\>`, 'gi');

      const handler = (
        _match: string,
        properties: string,
        children: string
      ) => {
        return interpreter(parseProps(properties), children || '');
      };

      result = result.replace(patt, handler).replace(pattSelfColsing, handler);
    }
  } catch (e) {
    result = text;
  }

  return result;
}

function parseProps(text: string) {
  const result: Record<string, string> = {};

  try {
    const strList = text.trim().split(' ');
    const patt = /^([^=]+)="([^"]+)"$/;

    for (const str of strList) {
      const matched = str.match(patt) || [];
      const propKey = matched[1] || '';
      const propVal = matched[2] || '';
      if (propKey) {
        result[propKey] = propVal.trim();
      }
    }
  } catch (e) {}

  return result;
}
