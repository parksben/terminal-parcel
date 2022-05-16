import components from './sugar';

const COMP_TAGS = components.map((x) => x.tag);

export default function clearTags(text: string) {
  let result = text;

  for (const tag of COMP_TAGS) {
    const patt = new RegExp(`\<${tag}[^>]*?>([^<]*?)<\/${tag}>`, 'i');
    const pattSelfColsing = new RegExp(`<${tag}[^>]*?\/>`, 'i');

    while (patt.test(result)) {
      result = result.replace(patt, '$1');
    }

    while (pattSelfColsing.test(result)) {
      result = result.replace(pattSelfColsing, '');
    }
  }

  return result;
}
