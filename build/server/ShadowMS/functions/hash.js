"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = __importStar(require("bcrypt"));
const hashify = (data, salt) => bcrypt.hash(data, salt)
    .then((hashed) => hashed)
    .catch(err => new Error(err));
exports.default = (data, rounds = 10) => __awaiter(this, void 0, void 0, function* () {
    return bcrypt.genSalt(rounds)
        .then((salt) => Array.isArray(data)
        ? Promise.all(data.map((item) => hashify(item, salt)))
        : hashify(data, salt))
        .catch((res) => { throw new Error(res); });
});
