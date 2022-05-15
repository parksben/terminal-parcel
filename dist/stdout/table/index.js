"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromMatrix = exports.fromRecord = void 0;
var renderTable_1 = require("./renderTable");
var utils_1 = require("./utils");
function fromRecord(record, options) {
    var data = (0, utils_1.recordToMatrix)(record);
    var _a = options || {}, headerMapping = _a.headerMapping, _b = _a.headerHighlight, headerHighlight = _b === void 0 ? true : _b, _c = _a.transpose, transpose = _c === void 0 ? false : _c;
    // rename table header
    if (headerMapping && Object.keys(headerMapping || {}).length && data[0]) {
        data[0] = data[0].map(function (x) { return headerMapping[x] || x; });
    }
    // highlight table header
    if (headerHighlight && data[0]) {
        data[0] = data[0].map(function (x) { return "<status type=\"notice.bold\" spec=\"table\">".concat(x, "</status>"); });
    }
    // insert the border bottom of table header
    if (!transpose && data[0]) {
        data.splice(1, 0, data[0].map(function () { return '{{borderXSymbol}}'; }));
    }
    return fromMatrix(data, options);
}
exports.fromRecord = fromRecord;
function fromMatrix(data, options) {
    var _a = options || {}, _b = _a.transpose, transpose = _b === void 0 ? false : _b, minColWidth = _a.minColWidth, borderHorizontal = _a.borderHorizontal, borderVertical = _a.borderVertical, borderCorner = _a.borderCorner;
    return (0, renderTable_1.default)({
        rows: transpose ? (0, utils_1.transposeMatrix)(data) : data,
        minColWidth: minColWidth,
        borderHorizontal: borderHorizontal,
        borderVertical: borderVertical,
        borderCorner: borderCorner,
    });
}
exports.fromMatrix = fromMatrix;
