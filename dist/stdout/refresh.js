"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var singleLineLog = require("single-line-log");
var parseSyntax_1 = require("./parseSyntax");
var log = singleLineLog(process.stdout);
function refresh(text, useSyntax) {
    log(useSyntax ? (0, parseSyntax_1.default)(text) : text);
}
exports.default = refresh;
