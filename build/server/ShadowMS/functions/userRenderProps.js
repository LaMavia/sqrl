"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (id, users) => users.find(user => String(user._id) === String(id));
