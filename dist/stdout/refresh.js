"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var single_line_log_1 = tslib_1.__importDefault(require("single-line-log"));
var parseSyntax_1 = tslib_1.__importDefault(require("./parseSyntax"));
var log = (0, single_line_log_1.default)(process.stdout);
function refresh(text, useSyntax) {
    if (useSyntax === void 0) { useSyntax = true; }
    log(useSyntax ? (0, parseSyntax_1.default)(text) : text);
}
exports.default = refresh;
