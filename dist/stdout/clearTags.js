"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sugar_1 = require("./sugar");
var COMP_TAGS = sugar_1.default.map(function (x) { return x.tag; });
function clearTags(text) {
    var result = text;
    for (var _i = 0, COMP_TAGS_1 = COMP_TAGS; _i < COMP_TAGS_1.length; _i++) {
        var tag = COMP_TAGS_1[_i];
        var patt = new RegExp("<".concat(tag, "[^>]*?>([^<]*?)</").concat(tag, ">"), 'i');
        var pattSelfColsing = new RegExp("<".concat(tag, "[^>]*?/>"), 'i');
        while (patt.test(result)) {
            result = result.replace(patt, '$1');
        }
        while (pattSelfColsing.test(result)) {
            result = result.replace(pattSelfColsing, '');
        }
    }
    return result;
}
exports.default = clearTags;
