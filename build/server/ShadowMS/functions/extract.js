"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extract = (sth) => Array.isArray(sth)
    ? sth[0]
    : sth;
