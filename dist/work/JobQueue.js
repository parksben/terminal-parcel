"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobQueue = void 0;
var tslib_1 = require("tslib");
var print_1 = tslib_1.__importDefault(require("../stdout/print"));
var refresh_1 = tslib_1.__importDefault(require("../stdout/refresh"));
var formatTimeSpent_1 = tslib_1.__importDefault(require("./formatTimeSpent"));
var JobQueue = /** @class */ (function () {
    function JobQueue(topic) {
        this.topic = topic;
        this.concurrency = 1;
        this.sequence = [];
        this.processor = function () { };
    }
    JobQueue.prototype.load = function (sequence, concurrency) {
        this.concurrency =
            typeof concurrency === 'number' ? Math.max(1, concurrency) : 1;
        this.sequence = Array.isArray(sequence) ? sequence : [];
    };
    JobQueue.prototype.program = function (processor) {
        this.processor = processor;
    };
    JobQueue.prototype.exec = function () {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var queue, dataLength, startAt;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        queue = chunk(this.sequence, this.concurrency);
                        dataLength = this.sequence.length;
                        startAt = performance.now();
                        (0, print_1.default)("\u2728 ".concat((_a = this.topic) !== null && _a !== void 0 ? _a : 'Execute jobs by queue...'), true);
                        (0, refresh_1.default)("<status type=\"notice\">[RUNNING]</status> <progress value=\"0/".concat(dataLength, "\" />"), true);
                        return [4 /*yield*/, queue.reduce(function (acc, item) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                var complete, itemSize, e_1;
                                var _this = this;
                                return tslib_1.__generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, Promise.resolve(acc)];
                                        case 1:
                                            complete = _a.sent();
                                            itemSize = Array.isArray(item) ? item.length : 1;
                                            _a.label = 2;
                                        case 2:
                                            _a.trys.push([2, 4, , 5]);
                                            return [4 /*yield*/, Promise.all(item.map(function (x, i) {
                                                    return _this.processor(x, complete + i, dataLength);
                                                }))];
                                        case 3:
                                            _a.sent();
                                            return [3 /*break*/, 5];
                                        case 4:
                                            e_1 = _a.sent();
                                            return [3 /*break*/, 5];
                                        case 5:
                                            (0, refresh_1.default)("<status type=\"notice\">[RUNNING]</status> <progress value=\"".concat(complete + itemSize, "/").concat(dataLength, "\" />"), true);
                                            return [2 /*return*/, complete + itemSize];
                                    }
                                });
                            }); }, 0)];
                    case 1:
                        _b.sent();
                        (0, refresh_1.default)('');
                        (0, print_1.default)("\u2728 Done in ".concat((0, formatTimeSpent_1.default)(performance.now() - startAt), "."), true);
                        return [2 /*return*/];
                }
            });
        });
    };
    return JobQueue;
}());
exports.JobQueue = JobQueue;
exports.default = JobQueue;
function chunk(arr, size) {
    var list = [];
    var length = Math.ceil(arr.length / size);
    for (var i = 0; i < length; i++) {
        list[i] = arr.slice(size * i, size * (i + 1));
    }
    return list;
}
