"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
function renderTable(_a) {
    var rows = _a.rows, _b = _a.minColWidth, minColWidth = _b === void 0 ? 5 : _b, _c = _a.borderHorizontal, borderHorizontal = _c === void 0 ? '-' : _c, _d = _a.borderVertical, borderVertical = _d === void 0 ? '|' : _d, _e = _a.borderCorner, borderCorner = _e === void 0 ? '+' : _e;
    var colWidth = {};
    var pattForHighlight = /<status[^>]*?spec="table"[^>]*?>([^<]*?)<\/status>/gi;
    var pattDoubleByte = /[^\x00-\xff]/g;
    var calColumnWidth = function (cn) {
        if (!colWidth[cn]) {
            var widthList = rows.map(function (row) {
                return String(row[cn])
                    .replace(pattForHighlight, '$1')
                    .replace('{{borderXSymbol}}', '')
                    .replace(pattDoubleByte, 'dd').length + 2;
            });
            colWidth[cn] = Math.max.apply(Math, tslib_1.__spreadArray(tslib_1.__spreadArray([], widthList, false), [minColWidth], false));
        }
        return colWidth[cn];
    };
    var borderTop = rows[0].map(function () { return '{{borderXSymbol}}'; });
    var renderRows = borderHorizontal ? tslib_1.__spreadArray(tslib_1.__spreadArray([borderTop], rows, true), [borderTop], false) : rows;
    var lines = renderRows.map(function (r) {
        var line = r
            .map(function (c, n) {
            var td = c === '{{borderXSymbol}}'
                ? "".concat(borderCorner).concat(new Array(calColumnWidth(n))
                    .fill(borderHorizontal)
                    .join(''))
                : "".concat(borderVertical, " ").concat(c).concat(new Array(calColumnWidth(n) -
                    String(c)
                        .replace(pattForHighlight, '$1')
                        .replace(pattDoubleByte, 'dd').length -
                    1)
                    .fill(' ')
                    .join(''));
            return td;
        })
            .join('');
        return "".concat(line).concat(r.includes('{{borderXSymbol}}') ? borderCorner : borderVertical);
    });
    return lines.join('\n');
}
exports.default = renderTable;
