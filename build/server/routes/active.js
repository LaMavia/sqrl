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
const Route_1 = __importDefault(require("../ShadowMS/classes/Route"));
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const handlerConstructor = (Shadow) => router.get("/", (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const { id } = req.query;
    if (!id) {
        res.redirect("/");
    }
    if (Shadow.data.nonActiveUsers[id]) {
        yield Shadow.AddToDB("User", Shadow.data.nonActiveUsers[id]);
        delete Shadow.data.nonActiveUsers[id];
    }
    else {
        next(new Error(`Unknown ID: ${id}`));
    }
    res.render("active", {
        id
    });
}));
exports.ActiveRoute = new Route_1.default("/active", handlerConstructor);
