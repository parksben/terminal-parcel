"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var colors = require("colors/safe");
var COLOR_MAPPING = {
    success: 'green',
    warning: 'yellow',
    error: 'red',
    notice: 'cyan',
};
exports.default = {
    tag: 'status',
    interpreter: function (props, children) {
        var colorPath = props.type;
        for (var _i = 0, _a = Object.entries(COLOR_MAPPING); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], val = _b[1];
            colorPath = colorPath.replace(key, val);
        }
        var render = new Function('colors', 'text', "return colors.".concat(colorPath, "(text)"));
        return render(colors, children);
    },
};
