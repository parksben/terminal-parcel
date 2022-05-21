"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var sugar_1 = tslib_1.__importDefault(require("./sugar"));
function parseSyntax(text) {
    var result = text;
    try {
        var _loop_1 = function (tag, interpreter) {
            var patt = new RegExp("<".concat(tag, "([^>]*?)>([^<]*?)</").concat(tag, ">"), 'i');
            var pattSelfColsing = new RegExp("<".concat(tag, "([^>]*?)/>"), 'i');
            var handler = function (_match, properties, children) {
                return interpreter(parseProps(properties), children || '');
            };
            while (patt.test(result)) {
                result = result.replace(patt, handler);
            }
            while (pattSelfColsing.test(result)) {
                result = result.replace(pattSelfColsing, handler);
            }
        };
        for (var _i = 0, components_1 = sugar_1.default; _i < components_1.length; _i++) {
            var _a = components_1[_i], tag = _a.tag, interpreter = _a.interpreter;
            _loop_1(tag, interpreter);
        }
    }
    catch (e) {
        result = text;
    }
    return result;
}
exports.default = parseSyntax;
function parseProps(text) {
    var result = {};
    try {
        var strList = text.trim().split(/(?<=")\s(?=\w)/g);
        var patt = /^([^=]+)="([^"]+)"$/;
        for (var _i = 0, strList_1 = strList; _i < strList_1.length; _i++) {
            var str = strList_1[_i];
            var matched = str.match(patt) || [];
            var propKey = matched[1] || '';
            var propVal = matched[2] || '';
            if (propKey) {
                result[propKey] = propVal;
            }
        }
    }
    catch (e) { }
    return result;
}
