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
    if (COLOR_MAPPING[props.type]) {
      const render = new Function(
        'colors',
        'text',
        `return colors.${COLOR_MAPPING[props.type]}(text)`
      );

      return render(colors, children);
    }

    return children;
  },
};
