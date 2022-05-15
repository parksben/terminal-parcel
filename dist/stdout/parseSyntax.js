"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sugar_1 = require("./sugar");
function parseSyntax(text) {
    var result = text;
    try {
        var _loop_1 = function (tag, interpreter) {
            var patt = new RegExp("<".concat(tag, "([^>]*?)>([^<]*?)</").concat(tag, ">"), 'gi');
            var pattSelfColsing = new RegExp("<".concat(tag, "([^>]*?)/>"), 'gi');
            var handler = function (_match, properties, children) {
                return interpreter(parseProps(properties), children || '');
            };
            result = result.replace(patt, handler).replace(pattSelfColsing, handler);
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
        var strList = text.trim().split(' ');
        var patt = /^([^=]+)="([^"]+)"$/;
        for (var _i = 0, strList_1 = strList; _i < strList_1.length; _i++) {
            var str = strList_1[_i];
            var matched = str.match(patt) || [];
            var propKey = matched[1] || '';
            var propVal = matched[2] || '';
            if (propKey) {
                result[propKey] = propVal.trim();
            }
        }
    }
    catch (e) { }
    return result;
}