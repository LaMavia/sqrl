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
const apollo_server_express_1 = require("apollo-server-express");
const mongoose_1 = __importDefault(require("mongoose"));
const util_1 = require("util");
const Model_1 = __importDefault(require("../ShadowMS/classes/Model"));
const extract_1 = require("../ShadowMS/functions/extract");
const objectifyObjectsId_1 = __importDefault(require("../ShadowMS/functions/objectifyObjectsId"));
const prepare_1 = __importDefault(require("../ShadowMS/functions/prepare"));
const sharedTypes_1 = __importDefault(require("./sharedTypes"));
exports.PostDBSchema = new mongoose_1.default.Schema({
    Author: mongoose_1.default.Schema.Types.ObjectId,
    Date: mongoose_1.default.Schema.Types.Date,
    Content: String,
    Likes: Number,
    Image: mongoose_1.default.Schema.Types.ObjectId,
    Edited: Boolean
});
exports.Post = new Model_1.default("Post", exports.PostDBSchema, "Posts");
exports.PostSchema = apollo_server_express_1.makeExecutableSchema({
    typeDefs: apollo_server_express_1.gql `
    type Query {
      Post(_id: ID, Author: ID, Date: String, Content: String, Likes: Int, Image: ID, Edited: Boolean): Post
      Posts(Author: ID, Date: String, Content: String, Likes: Int, Image: ID, Edited: Boolean, Limit: Int): [Post]
    }

    type Mutation {
      postAdd(Author: ID!, Content: String!, ImageID: String): Post
      postUpdate(_id: ID, Author: ID, Date: String, Content: String, Likes: Int, Image: ID, Many: Boolean = false): UpdateResult
      postDelete(_id: ID, Author: ID, Date: String, Content: String, Likes: Int, Image: ID, Many: Boolean = false): DeleteResult
    }

    ${sharedTypes_1.default}
  `
});
apollo_server_express_1.addMockFunctionsToSchema({
    schema: exports.PostSchema
});
exports.PostResolver = Shadow => ({
    Query: {
        Post: (_root, args) => __awaiter(this, void 0, void 0, function* () {
            const res = extract_1.extract(yield Shadow.GetFromDB("Post", objectifyObjectsId_1.default(args), 1));
            if (res) {
                const Author = yield Shadow.Resolve(res.Author, "User");
                if (res.Image) {
                }
                const out = Object.assign({}, res._doc, { Author, Image: `/img?id=${String(res.Image)}` });
                return prepare_1.default(out) || null;
            }
            return null;
        }),
        Posts: (_root, args) => __awaiter(this, void 0, void 0, function* () {
            const { Limit } = args;
            delete args.Limit;
            const res = yield Shadow.GetFromDB("Post", args, Limit || Number.MAX_SAFE_INTEGER);
            if (res) {
                const out = [];
                for (const post of res) {
                    let Image = post.Image && `/img?id=${String(post.Image)}`;
                    const Author = yield Shadow.Resolve(post.Author, "User");
                    out.push(Object.assign({}, post._doc || post, { Author, Image: Image || "" }));
                }
                return out.map(prepare_1.default);
            }
            return null;
        })
    },
    Mutation: {
        postAdd: (_root, { Author, Content, ImageID }) => __awaiter(this, void 0, void 0, function* () {
            const res = yield Shadow.AddToDB("Post", {
                Author: mongoose_1.default.Types.ObjectId(Author),
                Date: new Date().toDateString(),
                Content,
                Likes: 0,
                Image: ImageID ? mongoose_1.default.Types.ObjectId(ImageID) : null,
                Edited: false
            });
            if (res) {
                let image = null;
                const author = yield Shadow.Resolve(Author, "User");
                if (ImageID) {
                    image = (yield Shadow.Resolve(ImageID, "Image"));
                }
                const out = Object.assign({}, res._doc, {
                    Author: author,
                    Image: image ? image.Img : null
                });
                return out;
            }
            return null;
        }),
        postUpdate: (_root, args) => __awaiter(this, void 0, void 0, function* () {
            debugger;
            if (!args._id)
                throw new Error("_id not specified");
            const data = Object.assign({}, args);
            delete data._id;
            if (!util_1.isNullOrUndefined(data.Many))
                delete data.Many;
            for (const prop in data) {
                if (util_1.isNullOrUndefined(data[prop]))
                    delete data[prop];
            }
            const res = yield Shadow.UpdateDB("Post", { _id: args._id }, data, { multi: args.Many });
            return prepare_1.default(res);
        }),
        postDelete: (_root, args) => __awaiter(this, void 0, void 0, function* () {
            debugger;
            if (util_1.isNullOrUndefined(args) || Object.keys(args).length <= 0) {
                throw new Error("No conditions specified in userDelete. Prevented deleting all posts.");
            }
            if (args._id)
                args._id = mongoose_1.default.Types.ObjectId(args._id);
            const { Many } = args;
            if (typeof args.Many !== "undefined")
                delete args.Many;
            return yield Shadow.DeleteFromDB("Post", args, Many).then((res) => res.result);
        })
    }
});
