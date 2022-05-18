"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Workflow = void 0;
var tslib_1 = require("tslib");
var print_1 = require("../stdout/print");
var formatTimeSpent_1 = require("./formatTimeSpent");
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
    Workflow.prototype.start = function () {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var startAt, completion;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        startAt = performance.now();
                        (0, print_1.default)("\u2728 ".concat((_a = this.topic) !== null && _a !== void 0 ? _a : 'Workflow start...'), true);
                        return [4 /*yield*/, this.steps.reduce(function (value, step, index, steps) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                var processorValue, nextValue;
                                return tslib_1.__generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, Promise.resolve(value)];
                                        case 1:
                                            processorValue = _a.sent();
                                            (0, print_1.default)("<status type=\"notice\">[".concat(index + 1, "/").concat(steps.length, "]</status> ").concat(step.description), true);
                                            return [4 /*yield*/, Promise.resolve(step.processor(processorValue, index, steps.length))
                                                    .then(function (v) { return v; })
                                                    .catch(function (e) {
                                                    (0, print_1.default)("<status type=\"error\">[ERROR]</status> ".concat(String(e)), true);
                                                    process.exit(-1);
                                                })];
                                        case 2:
                                            nextValue = _a.sent();
                                            return [2 /*return*/, nextValue];
                                    }
                                });
                            }); }, undefined)];
                    case 1:
                        completion = _b.sent();
                        (0, print_1.default)("\u2728 Done in ".concat((0, formatTimeSpent_1.default)(performance.now() - startAt), "."), true);
                        return [2 /*return*/, completion];
                }
            });
        });
    };
    return Workflow;
}());
exports.Workflow = Workflow;
exports.default = Workflow;
