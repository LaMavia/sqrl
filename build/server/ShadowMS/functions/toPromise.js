"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (data) => new Promise((res) => {
    let copy;
    if (Array.isArray(data))
        copy = data.slice();
    else if (typeof data === "object")
        copy = Object.assign({}, data);
    else
        copy = data;
    return res(copy);
});
