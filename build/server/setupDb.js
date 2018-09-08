"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
exports.default = () => __awaiter(this, void 0, void 0, function* () {
    const _env = process.env["NODE_ENV"] || "dev";
    if (_env === "production")
        dotenv_1.default.config();
    else
        dotenv_1.default.config({ path: "./dev.env" });
    yield mongoose_1.default
        .connect(String(process.env["DB_LINK"]), {
        useNewUrlParser: true
    })
        .catch(err => {
        console.error(err);
        throw new Error("Cannot connect to the Database");
    });
    return mongoose_1.default.connection;
});
