"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ShadowMS_1 = __importDefault(require("./ShadowMS"));
const Comment_model_1 = require("./models/Comment.model");
const User_model_1 = require("./models/User.model");
const Post_model_1 = require("./models/Post.model");
const Image_model_1 = require("./models/Image.model");
const express_1 = __importDefault(require("express"));
const compression_1 = __importDefault(require("compression"));
const zlib_1 = __importDefault(require("zlib"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const path_1 = __importDefault(require("path"));
const setupDb_1 = __importDefault(require("./setupDb"));
const mongoose_1 = __importDefault(require("mongoose"));
const routes_1 = require("./routes");
const active_1 = require("./routes/active");
const logout_1 = require("./routes/logout");
const img_post_1 = require("./api/img.post");
const img_get_1 = require("./api/img.get");
setupDb_1.default();
exports.app = new ShadowMS_1.default(mongoose_1.default.connection, [Comment_model_1.Comment, User_model_1.User, Post_model_1.Post, Image_model_1.Image], [
    body_parser_1.default.json({ limit: "50mb" }),
    body_parser_1.default.urlencoded({ extended: false }),
    cookie_parser_1.default(),
    express_1.default.static(path_1.default.join(__dirname, "../client/assets/")),
    express_1.default.static(path_1.default.join(__dirname, "./public/")),
    compression_1.default({
        level: zlib_1.default.Z_BEST_SPEED,
        filter: (req, res) => {
            if (req.headers['x-no-compression']) {
                return false;
            }
            return compression_1.default.filter(req, res);
        }
    })
], [active_1.ActiveRoute, logout_1.LogoutRoute, routes_1.IndexRoute], [img_post_1.ImgPostRoute, img_get_1.ImgGetRoute], (err) => console.dir(new Error(err), { colors: true }), [Comment_model_1.CommentSchema, User_model_1.UserSchema, Post_model_1.PostSchema], [Comment_model_1.CommentResolver, User_model_1.UserResolver, Post_model_1.PostResolver]);
