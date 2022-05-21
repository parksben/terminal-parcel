"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Log = void 0;
var tslib_1 = require("tslib");
var node_fs_1 = tslib_1.__importDefault(require("node:fs"));
var path_1 = tslib_1.__importDefault(require("path"));
var Log = /** @class */ (function () {
    function Log(options) {
        var _a = options || {}, file = _a.file, encoding = _a.encoding, mode = _a.mode, formatter = _a.formatter;
        this.file = file;
        this.encoding = encoding;
        this.mode = mode || 'append';
        this.formatter =
            typeof formatter === 'function'
                ? formatter
                : function (record) { return "[".concat(new Date().toISOString(), "] ").concat(String(record)); };
        this.cache = [];
    }
    Log.prototype.add = function (record, useFormatter) {
        if (useFormatter === void 0) { useFormatter = true; }
        this.cache.push(String(useFormatter ? this.formatter(record) : record));
    };
    Log.prototype.save = function () {
        var filePath = path_1.default.resolve(process.cwd(), this.file);
        var content = this.cache.join('\n') + '\n';
        // clear the cache
        this.cache = [];
        // create file if not exists
        if (!node_fs_1.default.existsSync(filePath)) {
            node_fs_1.default.writeFileSync(filePath, '', { encoding: this.encoding });
        }
        if (this.mode === 'refresh') {
            node_fs_1.default.writeFileSync(filePath, content, { encoding: this.encoding });
        }
        if (this.mode === 'append') {
            node_fs_1.default.appendFileSync(filePath, content, { encoding: this.encoding });
        }
    };
    return Log;
}());
exports.Log = Log;
exports.default = Log;
