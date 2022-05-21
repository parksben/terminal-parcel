"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var safe_1 = tslib_1.__importDefault(require("colors/safe"));
exports.default = {
    tag: 'color',
    interpreter: function (props, children) {
        var render = new Function('colors', 'text', "return colors.".concat(props.apply, "(text)"));
        return render(safe_1.default, children);
    },
};
