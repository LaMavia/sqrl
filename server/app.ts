import ShadowMS from "./ShadowMS"
import mongoose from "mongoose"
import { Comment, CommentSchema, CommentResolver } from "./models/Comment.model"
import { User, UserSchema, UserResolver } from "./models/User.model"
import { Post, PostSchema, PostResolver } from "./models/Post.model"
import express from "express"
import compression from "compression"
import zlib from "zlib"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import path from "path"
import setupDb from "./setupDb"

import { IndexRoute } from "./routes"
import { ActiveRoute } from "./routes/active"
import { LogoutRoute } from "./routes/logout"
setupDb()
export const app = new ShadowMS(
	mongoose.connection,
	[Comment, User, Post],
	[
		bodyParser.json({ limit: "3mb" }),
		bodyParser.urlencoded({ extended: false }),
		cookieParser(),
		express.static(path.join(__dirname, "../client/assets/")),
		compression({
			level: zlib.Z_BEST_SPEED,
			filter: (req, res): boolean => {
				if(req.headers['x-no-compression']) {
					// don't compress responses with this request header
					return false
				}
				return compression.filter(req, res)
			}
		})
	],
	/**
	 * Keep IndexRoute as the last route, because it's a catch-all to help with react-router.
	 */
	[ActiveRoute, LogoutRoute, IndexRoute],
	[],
	(err: any) => new Error(err),
	[CommentSchema, UserSchema, PostSchema], 
	[CommentResolver, UserResolver, PostResolver]
)
