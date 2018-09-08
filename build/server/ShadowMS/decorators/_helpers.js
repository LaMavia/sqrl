"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.descriptorIsFunc = (key, func) => {
    if (!(typeof func === 'function')) {
        throw Error(`${key} is not a function!`);
    }
    return true;
};
