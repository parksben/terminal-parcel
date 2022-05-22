"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var table_1 = require("table");
var parseSyntax_1 = tslib_1.__importDefault(require("./parseSyntax"));
var table_2 = require("./table");
function print(text, useSyntax) {
    if (useSyntax === void 0) { useSyntax = true; }
    var output = '';
    if (typeof text === 'object' && Object.keys(text).length) {
        output = (0, table_2.fromRecord)(text, {
            transpose: true,
            border: (0, table_1.getBorderCharacters)('void'),
            columnDefault: {
                paddingLeft: 0,
                paddingRight: 1,
            },
            drawHorizontalLine: function () { return false; },
        });
    }
    else if (typeof text === 'string') {
        output = text;
    }
    if (!useSyntax) {
        // remove tags spec for the table rendering
        output = output.replace(/<color[^>]*?spec="table"[^>]*?>([^<]*?)<\/color>/gi, '$1');
    }
    process.stdout.write("".concat(useSyntax ? (0, parseSyntax_1.default)(output) : output, "\n"));
}
exports.default = print;
