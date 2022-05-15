"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transposeMatrix = exports.recordToMatrix = void 0;
var tslib_1 = require("tslib");
function recordToMatrix(record) {
    if (Array.isArray(record)) {
        var header = Object.keys(record[0] || {});
        var rows = record.map(function (obj) {
            return Object.values(obj || {});
        });
        return tslib_1.__spreadArray([header], rows, true);
    }
    return [Object.keys(record), Object.values(record)];
}
exports.recordToMatrix = recordToMatrix;
function transposeMatrix(data) {
    var result = [];
    if (data && data[0]) {
        for (var i = 0; i < data[0].length; i++) {
            result[i] = [];
            for (var j = 0; j < data.length; j++) {
                result[i][j] = data[j][i];
            }
        }
    }
    return result;
}
exports.transposeMatrix = transposeMatrix;
