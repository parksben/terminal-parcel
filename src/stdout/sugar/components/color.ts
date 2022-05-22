import colors from 'colors/safe';

// the records of status-color mapping
const STATUS_COLOR: Record<string, string> = {
  success: 'green',
  warning: 'yellow',
  error: 'red',
  notice: 'cyan',
};

export default {
  tag: 'color',
  interpreter: (props: Record<string, string>, children: string) => {
    let colorCode = props.code;

    for (const [key, val] of Object.entries(STATUS_COLOR)) {
      colorCode = colorCode.replace(key, val);
    }

    const render = new Function(
      'colors',
      'text',
      `return colors.${colorCode}(text)`
    );

    return render(colors, children);
  },
};
