"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var safe_1 = require("colors/safe");
// 进度条组件
exports.default = {
    tag: 'progress',
    interpreter: function (props) {
        var value = parseValue(props.value);
        var width = Number(props.width) || 50;
        var cellNum = Math.round(width * value);
        // 拼接黑色条
        var cell = '';
        for (var i = 0; i < cellNum; i++) {
            cell += '█';
        }
        // 拼接灰色条
        var empty = '';
        for (var i = 0; i < width - cellNum; i++) {
            empty += '░';
        }
        // 进度提示文案
        var text = '';
        var pattFraction = /^([\d.]+)\/([\d.]+)$/;
        if (pattFraction.test(props.value)) {
            var matched = props.value.match(pattFraction) || [];
            text = "".concat(Number(matched[1] || 0), "/").concat(Number(matched[2] || 1));
        }
        else {
            text = "".concat((100 * value).toFixed(1), "%");
        }
        return "".concat(cell).concat(empty, " ").concat((0, safe_1.cyan)(text));
    },
};
// 解析进度值
function parseValue(str) {
    var result = 0;
    var pattFraction = /^([\d.]+)\/([\d.]+)$/;
    var pattPerentage = /^([\d.]+)%$/;
    var pattNumber = /^([\d.]+)$/;
    if (pattFraction.test(str)) {
        var matched = str.match(pattFraction) || [];
        result = Number(matched[1] || 0) / Number(matched[2] || 1);
    }
    if (pattPerentage.test(str)) {
        var matched = str.match(pattPerentage) || [];
        result = Number(matched[1] || 0) / 100;
    }
    if (pattNumber.test(str)) {
        if (Number(str) < 0) {
            result = 0;
        }
        else if (Number(str) > 1) {
            result = 1;
        }
        else {
            result = Number(str);
        }
    }
    return result;
}
