"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var print_1 = require("../stdout/print");
function waitFor(condition, options) {
    var _this = this;
    var judge = typeof condition === 'function' ? condition : function () { return false; };
    var _a = options || {}, _b = _a.timeout, timeout = _b === void 0 ? 5000 : _b, _c = _a.timeoutMsg, timeoutMsg = _c === void 0 ? '<status type="warning">[TIMEOUT]</status> waiting timeout...' : _c, _d = _a.interval, interval = _d === void 0 ? 500 : _d;
    return new Promise(function (resolve, reject) {
        var isTimeout = false;
        var timeoutId = setTimeout(function () {
            isTimeout = true;
        }, timeout);
        var intervalId = setInterval(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var flag;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (isTimeout) {
                            (0, print_1.default)(timeoutMsg, true);
                            clearInterval(intervalId);
                            resolve(false);
                        }
                        return [4 /*yield*/, Promise.resolve(judge()).catch(function (e) {
                                (0, print_1.default)("<status type=\"error\">[ERROR]</status> ".concat(e), true);
                                if (timeoutId) {
                                    clearTimeout(timeoutId);
                                }
                                clearInterval(intervalId);
                                reject(e);
                            })];
                    case 1:
                        flag = _a.sent();
                        if (flag) {
                            if (timeoutId) {
                                clearTimeout(timeoutId);
                            }
                            clearInterval(intervalId);
                            resolve(true);
                        }
                        return [2 /*return*/];
                }
            });
        }); }, interval);
    });
}
exports.default = waitFor;
