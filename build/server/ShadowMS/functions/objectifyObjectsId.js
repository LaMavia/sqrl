"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
exports.default = (o) => {
    const ob = Object.assign({}, o);
    if (ob._id)
        ob._id = mongoose_1.default.Types.ObjectId(ob._id);
    if (ob.ids)
        ob.ids = ob.ids.map(mongoose_1.default.Types.ObjectId);
    return ob;
};
