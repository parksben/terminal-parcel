"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromMatrix = exports.fromRecord = void 0;
var renderTable_1 = require("./renderTable");
var utils_1 = require("./utils");
function fromRecord(record, options) {
    var data = (0, utils_1.recordToMatrix)(record);
    var _a = options || {}, headerAlias = _a.headerAlias, _b = _a.headerHighlight, headerHighlight = _b === void 0 ? true : _b, renderCell = _a.renderCell, _c = _a.transpose, transpose = _c === void 0 ? false : _c;
    // apply the `renderCell` method which is customized by the user
    if (typeof renderCell === 'function') {
        for (var cn = 0; cn < data[0].length; cn++) {
            var field = data[0][cn];
            var alias = (headerAlias || {})[field];
            var _loop_1 = function (rn) {
                var record_1 = {};
                data[0].forEach(function (field, col) {
                    record_1[field] = data[rn][col];
                });
                data[rn][cn] = renderCell(data[rn][cn], record_1, field, alias);
            };
            for (var rn = 1; rn < data.length; rn++) {
                _loop_1(rn);
            }
        }
    }
    // rename table header
    if (headerAlias && Object.keys(headerAlias || {}).length && data[0]) {
        data[0] = data[0].map(function (x) { return headerAlias[x] || x; });
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
