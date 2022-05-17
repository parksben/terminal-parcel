"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Workflow = void 0;
var tslib_1 = require("tslib");
var print_1 = require("../stdout/print");
var Workflow = /** @class */ (function () {
    function Workflow(topic) {
        this.topic = topic;
        this.steps = [];
        this.total = 0;
    }
    Workflow.prototype.add = function (description, processor) {
        this.steps.push({
            index: this.total,
            description: description,
            processor: processor,
        });
        this.total += 1;
    };
    Workflow.prototype.run = function () {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var startAt, completion;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        startAt = performance.now();
                        (0, print_1.default)("<status type=\"notice\">".concat((_a = this.topic) !== null && _a !== void 0 ? _a : 'The workflow is running...', "</status>"), true);
                        return [4 /*yield*/, this.steps.reduce(function (value, step, index, steps) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                var nextValue;
                                return tslib_1.__generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            (0, print_1.default)("<status type=\"notice\">[".concat(index + 1, "/").concat(steps.length, "]</status> ").concat(step.description), true);
                                            return [4 /*yield*/, Promise.resolve(step.processor(value, index, steps.length)).catch(function (e) {
                                                    (0, print_1.default)("<status type=\"error\">[ERROR]</status> ".concat(String(e)), true);
                                                    (0, print_1.default)("<status type=\"warning\">The workflow has exited with the exception, taken ".concat(formatTimeSpent(performance.now() - startAt), ".</status>"), true);
                                                    process.exit(-1);
                                                })];
                                        case 1:
                                            nextValue = _a.sent();
                                            return [2 /*return*/, { value: nextValue, index: index + 1, total: steps.length }];
                                    }
                                });
                            }); }, undefined)];
                    case 1:
                        completion = _b.sent();
                        (0, print_1.default)("<status type=\"notice\">The workflow has finished, taken ".concat(formatTimeSpent(performance.now() - startAt), ".</status>"), true);
                        return [2 /*return*/, completion === null || completion === void 0 ? void 0 : completion.value];
                }
            });
        });
    };
    return Workflow;
}());
exports.Workflow = Workflow;
exports.default = Workflow;
function formatTimeSpent(duration) {
    var sec = 1000;
    var min = 60 * sec;
    var hour = 60 * min;
    if (duration < sec) {
        return "".concat(Math.round(duration), "ms");
    }
    if (duration < min) {
        return "".concat(Math.round((10 * duration) / sec) / 10, "s");
    }
    if (duration < hour) {
        return "".concat(Math.round((10 * duration) / min) / 10, " minutes");
    }
    return "".concat(Math.round((10 * duration) / hour) / 10, " hours");
}
