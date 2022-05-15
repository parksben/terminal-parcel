"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var parseSyntax_1 = require("./parseSyntax");
function print(text, useSyntax) {
    process.stdout.write(useSyntax ? (0, parseSyntax_1.default)(text) : text);
    process.stdout.write('\n');
}
exports.default = print;
