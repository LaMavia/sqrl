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
const Model_1 = __importDefault(require("../ShadowMS/classes/Model"));
const apollo_server_express_1 = require("apollo-server-express");
const sharedTypes_1 = __importDefault(require("./sharedTypes"));
const util_1 = require("util");
const prepare_1 = __importDefault(require("../ShadowMS/functions/prepare"));
const extract_1 = require("../ShadowMS/functions/extract");
exports.CommentDBSchema = new mongoose_1.default.Schema({
    Author: mongoose_1.default.Schema.Types.ObjectId,
    Date: String,
    Content: String,
    Post: mongoose_1.default.Schema.Types.ObjectId,
});
exports.Comment = new Model_1.default('Comment', exports.CommentDBSchema, 'Comments');
exports.CommentSchema = apollo_server_express_1.makeExecutableSchema({
    typeDefs: apollo_server_express_1.gql `
		type Query {
			Comment(_id: ID): Comment
			Comments(
				_id: ID
				Author: ID
				Date: String
				Content: String
				Post: ID
			): [Comment]
		}

		type Mutation {
			commentAdd(Author: ID!, Content: String!, Post: ID!): Comment
			commentDelete(
				_id: ID
				Author: ID
				Content: String
				Post: ID
			): DeleteResult
			commentUpdate(_id: ID!, Content: String): UpdateResult
		}

		${sharedTypes_1.default}
	`,
});
apollo_server_express_1.addMockFunctionsToSchema({ schema: exports.CommentSchema });
exports.CommentResolver = Shadow => ({
    Mutation: {
        commentAdd: (_root, { Author, Content, Post }) => __awaiter(this, void 0, void 0, function* () {
            debugger;
            const res = yield Shadow.AddToDB('Comment', {
                Author: mongoose_1.default.Types.ObjectId(Author),
                Date: new Date().toDateString(),
                Content,
                Post: mongoose_1.default.Types.ObjectId(Post),
            });
            if (res) {
                const comment = extract_1.extract(res);
                const author = yield Shadow.Resolve(comment.Author, "User");
                const post = yield Shadow.Resolve(comment.Post, "Post");
                Object.assign(comment._doc, {
                    Author: author,
                    Post: post,
                });
                return res;
            }
            return null;
        }),
        commentDelete: (_root, args) => __awaiter(this, void 0, void 0, function* () {
            debugger;
            if (util_1.isNullOrUndefined(args) || Object.keys(args).length <= 0) {
                throw new Error('No conditions specified in commentDelete. Prevented deleting all comments.');
            }
            if (args._id)
                args._id = mongoose_1.default.Types.ObjectId(args._id);
            const { Many } = args;
            if (typeof args.Many !== 'undefined')
                delete args.Many;
            return yield Shadow.DeleteFromDB('Comment', args, !!Many).then((res) => res.result);
        }),
        commentUpdate: (_root, args) => __awaiter(this, void 0, void 0, function* () {
            debugger;
            if (!args._id)
                if (args._id)
                    args._id = mongoose_1.default.Types.ObjectId(args._id);
            const data = Object.assign({}, args);
            delete data._id;
            for (const prop in data) {
                if (util_1.isNullOrUndefined(data[prop]))
                    delete data[prop];
            }
            const res = yield Shadow.UpdateDB('Comment', { _id: args._id }, data);
            return res.result;
        }),
    },
    Query: {
        Comment: (_root, args) => __awaiter(this, void 0, void 0, function* () {
            if (args._id)
                args._id = String(args._id);
            const res = yield Shadow.GetFromDB('Comment', args, 1);
            const comment = extract_1.extract(res);
            const author = yield Shadow.Resolve(comment.Author, "User");
            const post = yield Shadow.Resolve(comment.Post, "Post");
            Object.assign(comment._doc, {
                Author: author,
                Post: post,
            });
            return prepare_1.default(comment);
        }),
        Comments: (_root, args) => __awaiter(this, void 0, void 0, function* () {
            const res = yield Shadow.GetFromDB('Comment', args);
            const out = [];
            for (const comment of res) {
                const author = yield Shadow.Resolve(comment.Author, 'User');
                const post = yield Shadow.Resolve(comment.Post, 'Post');
                const toOut = Object.assign({}, comment._doc, {
                    Author: author,
                    Post: post,
                });
                out.push(toOut);
            }
            return out.map(prepare_1.default);
        }),
    },
});
