"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var table_1 = require("table");
var parseSyntax_1 = tslib_1.__importDefault(require("../parseSyntax"));
var utils_1 = require("./utils");
var DEFAULT_CONFIG = {
    useSyntax: true,
    transpose: false,
    border: (0, table_1.getBorderCharacters)('norc'),
};
function renderTable(userData, userConfig) {
    var _a = tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({}, DEFAULT_CONFIG), (userConfig || {})), { border: tslib_1.__assign(tslib_1.__assign({}, DEFAULT_CONFIG.border), ((userConfig || {}).border || {})) }), transpose = _a.transpose, useSyntax = _a.useSyntax, others = tslib_1.__rest(_a, ["transpose", "useSyntax"]);
    var data = transpose ? (0, utils_1.transposeMatrix)(userData) : userData;
    if (useSyntax) {
        data = data.map(function (row) {
            return row.map(function (cell) { return (0, parseSyntax_1.default)(String(cell)); });
        });
    }
    return (0, table_1.table)(data, others).replace(/(\n|\r)*?$/, '');
}
exports.default = renderTable;
