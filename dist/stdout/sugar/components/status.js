"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var colors = require("colors/safe");
// 状态色映射
var COLOR_MAPPING = {
    success: 'green',
    warning: 'yellow',
    error: 'red',
    notice: 'cyan',
};
// 状态色组件
exports.default = {
    tag: 'status',
    interpreter: function (props, children) {
        if (COLOR_MAPPING[props.type]) {
            var render = new Function('colors', 'text', "return colors.".concat(COLOR_MAPPING[props.type], "(text)"));
            return render(colors, children);
        }
        return children;
    },
};
