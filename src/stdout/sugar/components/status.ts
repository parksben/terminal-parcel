import * as colors from 'colors/safe';

const COLOR_MAPPING: Record<string, string> = {
  success: 'green',
  warning: 'yellow',
  error: 'red',
  notice: 'cyan',
};

export default {
  tag: 'status',
  interpreter: (props: Record<string, string>, children: string) => {
    let colorPath = props.type;

    for (const [key, val] of Object.entries(COLOR_MAPPING)) {
      colorPath = colorPath.replace(key, val);
    }

    const render = new Function(
      'colors',
      'text',
      `return colors.${colorPath}(text)`
    );

    return render(colors, children);
  },
};
