"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromMatrix = exports.fromRecord = void 0;
var tslib_1 = require("tslib");
var lodash_clonedeep_1 = tslib_1.__importDefault(require("lodash.clonedeep"));
var renderTable_1 = tslib_1.__importDefault(require("./renderTable"));
var utils_1 = require("./utils");
function fromRecord(record, config) {
    var data = (0, utils_1.recordToMatrix)(record);
    var _a = config || {}, headerAlias = _a.headerAlias, _b = _a.headerHighlight, headerHighlight = _b === void 0 ? true : _b, renderCell = _a.renderCell, others = tslib_1.__rest(_a, ["headerAlias", "headerHighlight", "renderCell"]);
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
    return fromMatrix(data, others);
}
exports.fromRecord = fromRecord;
function fromMatrix(data, config) {
    var _a = config || {}, renderCell = _a.renderCell, others = tslib_1.__rest(_a, ["renderCell"]);
    var dataClone = (0, lodash_clonedeep_1.default)(data);
    // apply the `renderCell` method which is customized by the user
    if (typeof renderCell === 'function') {
        for (var rn = 0; rn < dataClone.length; rn++) {
            for (var cn = 0; cn < dataClone[rn].length; cn++) {
                dataClone[rn][cn] = renderCell(dataClone[rn][cn], rn, cn);
            }
        }
    }
    return (0, renderTable_1.default)(dataClone, others);
}
exports.fromMatrix = fromMatrix;
