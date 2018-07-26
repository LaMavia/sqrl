import ShadowMS from "./ShadowMS"
import mongoose from "mongoose"
import { Comment, CommentSchema, CommentResolver } from "./models/Comment.model"
import { User, UserSchema, UserResolver } from "./models/User.model"
import { Post, PostSchema, PostResolver } from "./models/Post.model"
import express from "express"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import path from "path"
import setupDb from "./setupDb"

import { IndexRoute } from "./routes/index"
setupDb()
export const app = new ShadowMS(
	mongoose.connection,
	[Comment, User, Post],
	[
		bodyParser.json({ limit: "3mb" }),
		bodyParser.urlencoded({ extended: false }),
		cookieParser(),
		express.static(path.join(__dirname, "../client/assets/"))
	],
	[IndexRoute],
	[],
	(err: any) => new Error(err),
	[CommentSchema, UserSchema, PostSchema], // , UserSchema],
	[CommentResolver, UserResolver, PostResolver] // , UserResolver]
)
