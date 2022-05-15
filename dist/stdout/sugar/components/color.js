"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var colors = require("colors/safe");
exports.default = {
    tag: 'color',
    interpreter: function (props, children) {
        var render = new Function('colors', 'text', "return colors.".concat(props.apply, "(text)"));
        return render(colors, children);
    },
};
