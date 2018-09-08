"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _helpers_1 = require("./_helpers");
exports.Timer = (label) => (_target, _name, descriptor) => {
    const original = descriptor.value;
    if (typeof original === 'function') {
        descriptor.value = function (...args) {
            console.time(label);
            debugger;
            try {
                const result = original.apply(this, args);
                return result;
            }
            catch (e) {
                console.log(`Error: ${e}`);
                throw e;
            }
            finally {
                console.log(`${label}->${JSON.stringify(args)}`);
                console.timeEnd(label);
                console.log();
            }
        };
    }
    return descriptor;
};
exports.TryChatch = (errorHandler) => {
    if (!(typeof errorHandler === 'function') && errorHandler) {
        throw Error(`The ErrorHandler should be a function. ${JSON.stringify(errorHandler)} is not a function`);
    }
    return (_target, key, descriptor) => {
        const func = descriptor.value;
        _helpers_1.descriptorIsFunc(key, func);
        descriptor.value = function (...args) {
            let res;
            try {
                res = func.apply(this, args);
            }
            catch (e) {
                ;
                (errorHandler || console.error)(e);
            }
            return res;
        };
        return descriptor;
    };
};
