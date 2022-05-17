import { cyan } from 'colors/safe';

export default {
  tag: 'progress',
  interpreter: (props: Record<string, string>) => {
    const value = parseValue(props.value);
    const width = Number(props.width) || 50;

    const markers = (props.symbol || '').split(',');
    const [m1, m2] = markers.length === 2 ? markers : ['█', '░'];

    const cellNum = Math.round(width * value);

    // complete
    let cell = '';
    for (let i = 0; i < cellNum; i++) {
      cell += m1;
    }

    // incomplete
    let empty = '';
    for (let i = 0; i < width - cellNum; i++) {
      empty += m2;
    }

    // description
    let text = '';
    const pattFraction = /^([\d.]+)\/([\d.]+)$/;
    if (pattFraction.test(props.value)) {
      const matched = props.value.match(pattFraction) || [];
      text = `${Number(matched[1] || 0)}/${Number(matched[2] || 1)}`;
    } else {
      text = `${(100 * value).toFixed(1)}%`;
    }

    return `${cell}${empty} ${cyan(text)}`;
  },
};

function parseValue(str: string) {
  let result = 0;

  const pattFraction = /^([\d.]+)\/([\d.]+)$/;
  const pattPerentage = /^([\d.]+)%$/;
  const pattNumber = /^([\d.]+)$/;

  if (pattFraction.test(str)) {
    const matched = str.match(pattFraction) || [];
    result = Number(matched[1] || 0) / Number(matched[2] || 1);
  }

  if (pattPerentage.test(str)) {
    const matched = str.match(pattPerentage) || [];
    result = Number(matched[1] || 0) / 100;
  }

  if (pattNumber.test(str)) {
    if (Number(str) < 0) {
      result = 0;
    } else if (Number(str) > 1) {
      result = 1;
    } else {
      result = Number(str);
    }
  }

  return result;
}
