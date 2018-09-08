"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
class Name extends mongoose_1.default.SchemaType {
    constructor(key, options) {
        super(key, options, "Name");
    }
    cast(val) {
        if (!val || !val.First || !val.Last) {
            throw new Error(`Name: {First: ${val.First}, Last: ${val.Last}} is not assignable to the type Name`);
        }
        return val;
    }
}
exports.Name = Name;
mongoose_1.default.SchemaTypes.Name = Name;
