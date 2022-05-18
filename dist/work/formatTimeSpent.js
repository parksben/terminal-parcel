"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = formatTimeSpent;
