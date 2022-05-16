"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var parseSyntax_1 = require("./parseSyntax");
var table_1 = require("./table");
function print(text, useSyntax) {
    var output = '';
    if (typeof text === 'object' && Object.keys(text).length) {
        output = (0, table_1.fromRecord)(text, {
            transpose: true,
            borderHorizontal: '',
            borderVertical: '',
            borderCorner: '',
        });
    }
    else if (typeof text === 'string') {
        output = text;
    }
    if (!useSyntax) {
        // remove tags spec for the table rendering
        output = output.replace(/<status[^>]*?spec="table"[^>]*?>([^<]*?)<\/status>/gi, '$1');
    }
    // process.stdout.write(`${useSyntax ? parseSyntax(output) : output}\n`);
    console.log(useSyntax ? (0, parseSyntax_1.default)(output) : output);
}
exports.default = print;
