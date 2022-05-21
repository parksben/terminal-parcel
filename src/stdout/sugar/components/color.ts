import colors from 'colors/safe';

export default {
  tag: 'color',
  interpreter: (props: Record<string, string>, children: string) => {
    const render = new Function(
      'colors',
      'text',
      `return colors.${props.apply}(text)`
    );
    return render(colors, children);
  },
};
