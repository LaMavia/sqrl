"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (cookie) => {
    const arr = cookie.split("=");
    const output = {};
    for (let i = 0; i < arr.length && arr[i]; i += 2) {
        output[arr[i]] = arr[i + 1];
    }
    return output;
};
