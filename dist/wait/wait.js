"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function wait(timing) {
    return new Promise(function (res) { return setTimeout(res, timing); });
}
exports.default = wait;
