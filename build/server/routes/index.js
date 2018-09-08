"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Route_1 = __importDefault(require("../ShadowMS/classes/Route"));
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const handlerConstructor = (_Shadow) => router.get("*", (_req, res) => {
    res.render("layout", {});
});
exports.IndexRoute = new Route_1.default("*", handlerConstructor);
