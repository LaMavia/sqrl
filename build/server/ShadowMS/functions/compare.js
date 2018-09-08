"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareArray = (a1, a2) => {
    if (a1.length !== a2.length)
        return false;
    let theSame = true;
    const a1s = a1.slice().sort();
    const a2s = a2.slice().sort();
    for (let i = 0; i < a1.length && theSame; i++) {
        const [v1, v2] = [a1s[i], a2s[i]];
        if (Array.isArray(a1[i]) && Array.isArray(a2[i])) {
            theSame = exports.compareArray(v1, v2)
                ? theSame
                : false;
        }
        else if (typeof v1 === "object" && typeof v2 === "object") {
            theSame = Object.is(v1, v2)
                ? theSame
                : false;
        }
        else {
            theSame = v1 === v2;
        }
    }
    return theSame;
};
