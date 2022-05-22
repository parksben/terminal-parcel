"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var safe_1 = tslib_1.__importDefault(require("colors/safe"));
// the records of status-color mapping
var STATUS_COLOR = {
    success: 'green',
    warning: 'yellow',
    error: 'red',
    notice: 'cyan',
};
exports.default = {
    tag: 'color',
    interpreter: function (props, children) {
        var colorCode = props.code;
        for (var _i = 0, _a = Object.entries(STATUS_COLOR); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], val = _b[1];
            colorCode = colorCode.replace(key, val);
        }
        var render = new Function('colors', 'text', "return colors.".concat(colorCode, "(text)"));
        return render(safe_1.default, children);
    },
};
