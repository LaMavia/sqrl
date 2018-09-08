"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
System.register("server/ShadowMS/classes/Model", [], function (exports_1, context_1) {
    "use strict";
    var Schema;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            Schema = class Schema {
                constructor(name, schema, collection) {
                    this.name = name;
                    this.schema = schema;
                    this.collection = collection;
                }
            };
            exports_1("default", Schema);
        }
    };
});
System.register("server/models/sharedTypes", [], function (exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    return {
        setters: [],
        execute: function () {
            exports_2("default", `
type DeleteResult {
  n: Int!
  ok: Int
}

type UpdateResult {
  n: Int!
  ok: Int!
  nModified: Int!
}

type Comment {
  _id: ID!
  Author: User!
  Date: String!
  Content: String!
  Post: Post!
}

type Post {
  _id: ID!
  Author: User!
  Date: String!
  Content: String!
  Likes: Int!
  Image: String
  Edited: Boolean
}

type User {
  _id: ID
  Name: String!
  Username: String!
  Password: String!
  Email: String!
  ProfileImageURL: String
  BackgroundImageURL: String
  Followers: [User]
  LikedPosts: [Post]
}
`);
        }
    };
});
System.register("server/ShadowMS/functions/prepare", [], function (exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    return {
        setters: [],
        execute: function () {
            exports_3("default", (model) => {
                if (!model)
                    throw new Error("Inproper model in prepare");
                return (Object.assign({}, (model._doc || model), { _id: String(model._id) }));
            });
        }
    };
});
System.register("server/ShadowMS/functions/extract", [], function (exports_4, context_4) {
    "use strict";
    var extract;
    var __moduleName = context_4 && context_4.id;
    return {
        setters: [],
        execute: function () {
            exports_4("extract", extract = (sth) => Array.isArray(sth)
                ? sth[0]
                : sth);
        }
    };
});
System.register("server/models/Comment.model", ["mongoose", "server/ShadowMS/classes/Model", "apollo-server-express", "server/models/sharedTypes", "util", "server/ShadowMS/functions/prepare", "server/ShadowMS/functions/extract"], function (exports_5, context_5) {
    "use strict";
    var mongoose_1, Model_1, apollo_server_express_1, sharedTypes_1, util_1, prepare_1, extract_1, CommentDBSchema, Comment, CommentSchema, CommentResolver;
    var __moduleName = context_5 && context_5.id;
    return {
        setters: [
            function (mongoose_1_1) {
                mongoose_1 = mongoose_1_1;
            },
            function (Model_1_1) {
                Model_1 = Model_1_1;
            },
            function (apollo_server_express_1_1) {
                apollo_server_express_1 = apollo_server_express_1_1;
            },
            function (sharedTypes_1_1) {
                sharedTypes_1 = sharedTypes_1_1;
            },
            function (util_1_1) {
                util_1 = util_1_1;
            },
            function (prepare_1_1) {
                prepare_1 = prepare_1_1;
            },
            function (extract_1_1) {
                extract_1 = extract_1_1;
            }
        ],
        execute: function () {
            exports_5("CommentDBSchema", CommentDBSchema = new mongoose_1.default.Schema({
                Author: mongoose_1.default.Schema.Types.ObjectId,
                Date: String,
                Content: String,
                Post: mongoose_1.default.Schema.Types.ObjectId,
            }));
            exports_5("Comment", Comment = new Model_1.default('Comment', CommentDBSchema, 'Comments'));
            exports_5("CommentSchema", CommentSchema = apollo_server_express_1.makeExecutableSchema({
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
            }));
            apollo_server_express_1.addMockFunctionsToSchema({ schema: CommentSchema });
            exports_5("CommentResolver", CommentResolver = Shadow => ({
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
            }));
        }
    };
});
System.register("server/ShadowMS/functions/hash", ["bcrypt"], function (exports_6, context_6) {
    "use strict";
    var bcrypt, hashify;
    var __moduleName = context_6 && context_6.id;
    return {
        setters: [
            function (bcrypt_1) {
                bcrypt = bcrypt_1;
            }
        ],
        execute: function () {
            hashify = (data, salt) => bcrypt.hash(data, salt)
                .then((hashed) => hashed)
                .catch(err => new Error(err));
            exports_6("default", (data, rounds = 10) => __awaiter(this, void 0, void 0, function* () {
                return bcrypt.genSalt(rounds)
                    .then((salt) => Array.isArray(data)
                    ? Promise.all(data.map((item) => hashify(item, salt)))
                    : hashify(data, salt))
                    .catch((res) => { throw new Error(res); });
            }));
        }
    };
});
System.register("server/ShadowMS/functions/objectifyObjectsId", ["mongoose"], function (exports_7, context_7) {
    "use strict";
    var mongoose_2;
    var __moduleName = context_7 && context_7.id;
    return {
        setters: [
            function (mongoose_2_1) {
                mongoose_2 = mongoose_2_1;
            }
        ],
        execute: function () {
            exports_7("default", (o) => {
                const ob = Object.assign({}, o);
                if (ob._id)
                    ob._id = mongoose_2.default.Types.ObjectId(ob._id);
                if (ob.ids)
                    ob.ids = ob.ids.map(mongoose_2.default.Types.ObjectId);
                return ob;
            });
        }
    };
});
System.register("server/models/User.model", ["mongoose", "bcrypt", "server/ShadowMS/classes/Model", "apollo-server-express", "server/ShadowMS/functions/hash", "server/ShadowMS/functions/prepare", "util", "server/ShadowMS/functions/objectifyObjectsId", "server/models/sharedTypes", "server/ShadowMS/functions/extract"], function (exports_8, context_8) {
    "use strict";
    var mongoose_3, bcrypt_2, Model_2, apollo_server_express_2, hash_1, prepare_2, util_2, objectifyObjectsId_1, sharedTypes_2, extract_2, UserDBSchema, User, UserSchema, UserResolver;
    var __moduleName = context_8 && context_8.id;
    return {
        setters: [
            function (mongoose_3_1) {
                mongoose_3 = mongoose_3_1;
            },
            function (bcrypt_2_1) {
                bcrypt_2 = bcrypt_2_1;
            },
            function (Model_2_1) {
                Model_2 = Model_2_1;
            },
            function (apollo_server_express_2_1) {
                apollo_server_express_2 = apollo_server_express_2_1;
            },
            function (hash_1_1) {
                hash_1 = hash_1_1;
            },
            function (prepare_2_1) {
                prepare_2 = prepare_2_1;
            },
            function (util_2_1) {
                util_2 = util_2_1;
            },
            function (objectifyObjectsId_1_1) {
                objectifyObjectsId_1 = objectifyObjectsId_1_1;
            },
            function (sharedTypes_2_1) {
                sharedTypes_2 = sharedTypes_2_1;
            },
            function (extract_2_1) {
                extract_2 = extract_2_1;
            }
        ],
        execute: function () {
            exports_8("UserDBSchema", UserDBSchema = new mongoose_3.default.Schema({
                Name: String,
                Username: String,
                Password: String,
                Email: String,
                ProfileImageURL: String,
                BackgroundImageURL: String,
                Followers: [mongoose_3.default.Schema.Types.ObjectId],
                LikedPosts: [mongoose_3.default.Schema.Types.ObjectId]
            }));
            exports_8("User", User = new Model_2.default("User", UserDBSchema, "Users"));
            exports_8("UserSchema", UserSchema = apollo_server_express_2.makeExecutableSchema({
                typeDefs: apollo_server_express_2.gql `
		type Query {
			User(_id: ID, Name: String, Username: String, Email: String): User
			Users(Ids: [ID], _id: ID, Name: String, Username: String, Email: String): [User]
			Login(Username: String!, Password: String!): User
			LoginWithID(_id: ID!): User
		}

		type Mutation {
			userAdd(
				Name: String!
				Username: String!
				Password: String!
				Email: String!
			): User
			userUpdate(
				_id: ID!
				Name: String
				Username: String
				Password: String
        Email: String
        ProfileImageURL: String
			): UpdateResult
			userDelete(
				_id: ID!
				Name: String
				Username: String
				Password: String
				Email: String
				Many: Boolean = false
			): DeleteResult
		}

		${sharedTypes_2.default}
	`
            }));
            apollo_server_express_2.addMockFunctionsToSchema({
                schema: UserSchema
            });
            exports_8("UserResolver", UserResolver = Shadow => ({
                Mutation: {
                    userAdd: (_root, { Name, Username, Password, Email, Activate }) => __awaiter(this, void 0, void 0, function* () {
                        const isTaken = Shadow.data["User"]
                            .some((dUser) => dUser.Username === Username || dUser.Email === Email);
                        if (isTaken)
                            return null;
                        const modelProps = {
                            Name,
                            Username,
                            Password: yield hash_1.default(Password),
                            Email,
                            ProfileImageURL: "",
                            BackgroundImageURL: "",
                            Followers: []
                        };
                        if (Activate) {
                            return yield Shadow.AddToDB("User", modelProps)
                                .catch(err => {
                                throw new Error(err);
                            });
                        }
                        const id = mongoose_3.default.Types.ObjectId.createFromTime(new Date().getUTCSeconds());
                        Shadow.data.nonActiveUsers[String(id)] = modelProps;
                        Shadow.SendRegConfirm(modelProps.Email, String(id));
                        return true;
                    }),
                    userUpdate: (_root, args) => __awaiter(this, void 0, void 0, function* () {
                        if (!args._id)
                            throw new Error("_id not specified");
                        const data = Object.assign({}, args);
                        delete data._id;
                        for (const prop in data) {
                            if (util_2.isNullOrUndefined(data[prop]))
                                delete data[prop];
                            if (prop === "Password")
                                data[prop] = yield hash_1.default(data[prop]);
                        }
                        return yield Shadow.UpdateDB("User", { _id: args._id }, data);
                    }),
                    userDelete: (_root, args) => __awaiter(this, void 0, void 0, function* () {
                        if (util_2.isNullOrUndefined(args) || Object.keys(args).length <= 0) {
                            throw new Error("No conditions specified in userDelete. Prevented deleting all users.");
                        }
                        objectifyObjectsId_1.default(args);
                        const { Many } = args;
                        if (typeof args.Many !== "undefined")
                            delete args.Many;
                        return yield Shadow.DeleteFromDB("User", args, !!Many).then((res) => res.result);
                    })
                },
                Query: {
                    User(_root, args) {
                        return __awaiter(this, void 0, void 0, function* () {
                            args = objectifyObjectsId_1.default(args);
                            const res = yield Shadow.GetFromDB("User", args, 1);
                            if (res) {
                                const user = prepare_2.default(extract_2.extract(res));
                                let followers = yield Shadow.Resolve(user.Followers, "User");
                                const out = Object.assign({}, user, { Followers: followers });
                                return out || null;
                            }
                            return null;
                        });
                    },
                    Users: (_root, args) => __awaiter(this, void 0, void 0, function* () {
                        args = objectifyObjectsId_1.default(args);
                        let res;
                        if (args.Ids) {
                            const argsCopy = Object.assign({}, args);
                            delete argsCopy.Ids;
                            res = [];
                            for (const _id of args.Ids) {
                                const user = extract_2.extract(yield Shadow.GetFromDB("User", Object.assign({ _id }, argsCopy), 1));
                                const followers = [];
                                for (const id of user.Followers.map(String)) {
                                    const follower = prepare_2.default(extract_2.extract(yield Shadow.GetFromDB('User', {
                                        _id: id,
                                    })));
                                    followers.push(follower);
                                }
                                res.push(Object.assign({}, user._doc, { Followers: followers }));
                            }
                        }
                        else {
                            res = prepare_2.default(yield Shadow.GetFromDB("User", args));
                        }
                        return res.map(prepare_2.default);
                    }),
                    Login: (_root, { Username, Password }) => __awaiter(this, void 0, void 0, function* () {
                        const users = yield Shadow.GetFromDB("User", { Username });
                        if (!users || users.length < 1)
                            return null;
                        const user = prepare_2.default(extract_2.extract(users));
                        const samePassword = yield bcrypt_2.default.compare(Password, user.Password);
                        if (samePassword) {
                            const followers = yield Shadow.Resolve(user.Followers, "User");
                            const out = Object.assign({}, user, { Followers: followers });
                            return prepare_2.default(out);
                        }
                        return null;
                    }),
                    LoginWithID: (_root, { _id }) => __awaiter(this, void 0, void 0, function* () {
                        const users = yield Shadow.GetFromDB("User", { _id: String(_id) });
                        if (!users || users.length < 1)
                            return null;
                        const user = prepare_2.default(extract_2.extract(users));
                        if (user) {
                            const followers = yield Shadow.Resolve(user.Followers, "User");
                            const out = Object.assign({}, user, { Followers: followers });
                            return prepare_2.default(out);
                        }
                        return null;
                    })
                }
            }));
        }
    };
});
System.register("client/src/dtos/comment.dto", ["class-validator", "mongoose", "client/src/dtos/user.dto", "client/src/dtos/post.dto"], function (exports_9, context_9) {
    "use strict";
    var class_validator_1, mongoose_4, user_dto_1, post_dto_1, Comment;
    var __moduleName = context_9 && context_9.id;
    return {
        setters: [
            function (class_validator_1_1) {
                class_validator_1 = class_validator_1_1;
            },
            function (mongoose_4_1) {
                mongoose_4 = mongoose_4_1;
            },
            function (user_dto_1_1) {
                user_dto_1 = user_dto_1_1;
            },
            function (post_dto_1_1) {
                post_dto_1 = post_dto_1_1;
            }
        ],
        execute: function () {
            Comment = class Comment {
                constructor(_id, Author, Date, Content, Post) {
                    this._id = _id;
                    this.Author = Author;
                    this.Date = Date;
                    this.Content = Content;
                    this.Post = Post;
                }
            };
            __decorate([
                class_validator_1.IsMongoId(),
                __metadata("design:type", mongoose_4.default.Types.ObjectId)
            ], Comment.prototype, "_id", void 0);
            __decorate([
                class_validator_1.IsInstance(user_dto_1.User),
                __metadata("design:type", user_dto_1.User)
            ], Comment.prototype, "Author", void 0);
            __decorate([
                class_validator_1.IsDate(),
                __metadata("design:type", String)
            ], Comment.prototype, "Date", void 0);
            __decorate([
                class_validator_1.IsString(),
                __metadata("design:type", String)
            ], Comment.prototype, "Content", void 0);
            __decorate([
                class_validator_1.IsInstance(post_dto_1.Post),
                __metadata("design:type", post_dto_1.Post)
            ], Comment.prototype, "Post", void 0);
            exports_9("Comment", Comment);
        }
    };
});
System.register("client/src/dtos/post.dto", ["class-validator", "mongoose", "client/src/dtos/comment.dto", "client/src/dtos/user.dto"], function (exports_10, context_10) {
    "use strict";
    var class_validator_2, mongoose_5, comment_dto_1, user_dto_2, Post;
    var __moduleName = context_10 && context_10.id;
    return {
        setters: [
            function (class_validator_2_1) {
                class_validator_2 = class_validator_2_1;
            },
            function (mongoose_5_1) {
                mongoose_5 = mongoose_5_1;
            },
            function (comment_dto_1_1) {
                comment_dto_1 = comment_dto_1_1;
            },
            function (user_dto_2_1) {
                user_dto_2 = user_dto_2_1;
            }
        ],
        execute: function () {
            Post = class Post {
                constructor(_id, Author, Date, Content, Likes, Edited, Image, Comments = []) {
                    this._id = _id;
                    this.Author = Author;
                    this.Date = Date;
                    this.Content = Content;
                    this.Likes = Likes;
                    this.Edited = Edited;
                    this.Image = Image;
                    this.Comments = Comments;
                }
            };
            __decorate([
                class_validator_2.IsMongoId(),
                __metadata("design:type", mongoose_5.default.Types.ObjectId)
            ], Post.prototype, "_id", void 0);
            __decorate([
                class_validator_2.IsInstance(user_dto_2.User),
                __metadata("design:type", user_dto_2.User)
            ], Post.prototype, "Author", void 0);
            __decorate([
                class_validator_2.IsString(),
                __metadata("design:type", String)
            ], Post.prototype, "Date", void 0);
            __decorate([
                class_validator_2.IsString(),
                __metadata("design:type", String)
            ], Post.prototype, "Content", void 0);
            __decorate([
                class_validator_2.IsInt(),
                __metadata("design:type", Number)
            ], Post.prototype, "Likes", void 0);
            __decorate([
                class_validator_2.IsBoolean(),
                __metadata("design:type", Boolean)
            ], Post.prototype, "Edited", void 0);
            __decorate([
                class_validator_2.IsString(),
                __metadata("design:type", String)
            ], Post.prototype, "Image", void 0);
            __decorate([
                class_validator_2.IsInstance(comment_dto_1.Comment, { each: true }),
                __metadata("design:type", Array)
            ], Post.prototype, "Comments", void 0);
            exports_10("Post", Post);
        }
    };
});
System.register("client/src/dtos/user.dto", ["class-validator", "mongoose", "client/src/dtos/post.dto"], function (exports_11, context_11) {
    "use strict";
    var class_validator_3, mongoose_6, post_dto_2, User;
    var __moduleName = context_11 && context_11.id;
    return {
        setters: [
            function (class_validator_3_1) {
                class_validator_3 = class_validator_3_1;
            },
            function (mongoose_6_1) {
                mongoose_6 = mongoose_6_1;
            },
            function (post_dto_2_1) {
                post_dto_2 = post_dto_2_1;
            }
        ],
        execute: function () {
            User = class User {
                constructor(_id, Name, Username, Password, Email, ProfileImageURL, BackgroundImageURL, Followers, LikedPosts) {
                    this._id = _id;
                    this.Name = Name;
                    this.Username = Username;
                    this.Password = Password;
                    this.Email = Email;
                    this.ProfileImageURL = ProfileImageURL;
                    this.BackgroundImageURL = BackgroundImageURL;
                    this.Followers = Followers;
                    this.LikedPosts = LikedPosts;
                }
            };
            __decorate([
                class_validator_3.IsMongoId(),
                __metadata("design:type", mongoose_6.default.Schema.Types.ObjectId)
            ], User.prototype, "_id", void 0);
            __decorate([
                class_validator_3.IsString(),
                __metadata("design:type", String)
            ], User.prototype, "Name", void 0);
            __decorate([
                class_validator_3.IsString(),
                __metadata("design:type", String)
            ], User.prototype, "Username", void 0);
            __decorate([
                class_validator_3.IsString(),
                __metadata("design:type", String)
            ], User.prototype, "Password", void 0);
            __decorate([
                class_validator_3.IsEmail(),
                __metadata("design:type", String)
            ], User.prototype, "Email", void 0);
            __decorate([
                class_validator_3.IsUrl(),
                __metadata("design:type", String)
            ], User.prototype, "ProfileImageURL", void 0);
            __decorate([
                class_validator_3.IsUrl(),
                __metadata("design:type", String)
            ], User.prototype, "BackgroundImageURL", void 0);
            __decorate([
                class_validator_3.IsInstance(User, { each: true }),
                __metadata("design:type", Array)
            ], User.prototype, "Followers", void 0);
            __decorate([
                class_validator_3.IsInstance(post_dto_2.Post, { each: true }),
                __metadata("design:type", Array)
            ], User.prototype, "LikedPosts", void 0);
            exports_11("User", User);
        }
    };
});
System.register("server/models/Post.model", ["apollo-server-express", "mongoose", "util", "server/ShadowMS/classes/Model", "server/ShadowMS/functions/extract", "server/ShadowMS/functions/objectifyObjectsId", "server/ShadowMS/functions/prepare", "server/models/sharedTypes"], function (exports_12, context_12) {
    "use strict";
    var apollo_server_express_3, mongoose_7, util_3, Model_3, extract_3, objectifyObjectsId_2, prepare_3, sharedTypes_3, PostDBSchema, Post, PostSchema, PostResolver;
    var __moduleName = context_12 && context_12.id;
    return {
        setters: [
            function (apollo_server_express_3_1) {
                apollo_server_express_3 = apollo_server_express_3_1;
            },
            function (mongoose_7_1) {
                mongoose_7 = mongoose_7_1;
            },
            function (util_3_1) {
                util_3 = util_3_1;
            },
            function (Model_3_1) {
                Model_3 = Model_3_1;
            },
            function (extract_3_1) {
                extract_3 = extract_3_1;
            },
            function (objectifyObjectsId_2_1) {
                objectifyObjectsId_2 = objectifyObjectsId_2_1;
            },
            function (prepare_3_1) {
                prepare_3 = prepare_3_1;
            },
            function (sharedTypes_3_1) {
                sharedTypes_3 = sharedTypes_3_1;
            }
        ],
        execute: function () {
            exports_12("PostDBSchema", PostDBSchema = new mongoose_7.default.Schema({
                Author: mongoose_7.default.Schema.Types.ObjectId,
                Date: mongoose_7.default.Schema.Types.Date,
                Content: String,
                Likes: Number,
                Image: mongoose_7.default.Schema.Types.ObjectId,
                Edited: Boolean
            }));
            exports_12("Post", Post = new Model_3.default("Post", PostDBSchema, "Posts"));
            exports_12("PostSchema", PostSchema = apollo_server_express_3.makeExecutableSchema({
                typeDefs: apollo_server_express_3.gql `
    type Query {
      Post(_id: ID, Author: ID, Date: String, Content: String, Likes: Int, Image: ID, Edited: Boolean): Post
      Posts(Author: ID, Date: String, Content: String, Likes: Int, Image: ID, Edited: Boolean, Limit: Int): [Post]
    }

    type Mutation {
      postAdd(Author: ID!, Content: String!, ImageID: String): Post
      postUpdate(_id: ID, Author: ID, Date: String, Content: String, Likes: Int, Image: ID, Many: Boolean = false): UpdateResult
      postDelete(_id: ID, Author: ID, Date: String, Content: String, Likes: Int, Image: ID, Many: Boolean = false): DeleteResult
    }

    ${sharedTypes_3.default}
  `
            }));
            apollo_server_express_3.addMockFunctionsToSchema({
                schema: PostSchema
            });
            exports_12("PostResolver", PostResolver = Shadow => ({
                Query: {
                    Post: (_root, args) => __awaiter(this, void 0, void 0, function* () {
                        const res = extract_3.extract(yield Shadow.GetFromDB("Post", objectifyObjectsId_2.default(args), 1));
                        if (res) {
                            const Author = yield Shadow.Resolve(res.Author, "User");
                            if (res.Image) {
                            }
                            const out = Object.assign({}, res._doc, { Author, Image: `/img?id=${String(res.Image)}` });
                            return prepare_3.default(out) || null;
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
                            return out.map(prepare_3.default);
                        }
                        return null;
                    })
                },
                Mutation: {
                    postAdd: (_root, { Author, Content, ImageID }) => __awaiter(this, void 0, void 0, function* () {
                        const res = yield Shadow.AddToDB("Post", {
                            Author: mongoose_7.default.Types.ObjectId(Author),
                            Date: new Date().toDateString(),
                            Content,
                            Likes: 0,
                            Image: ImageID ? mongoose_7.default.Types.ObjectId(ImageID) : null,
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
                        if (!util_3.isNullOrUndefined(data.Many))
                            delete data.Many;
                        for (const prop in data) {
                            if (util_3.isNullOrUndefined(data[prop]))
                                delete data[prop];
                        }
                        const res = yield Shadow.UpdateDB("Post", { _id: args._id }, data, { multi: args.Many });
                        return prepare_3.default(res);
                    }),
                    postDelete: (_root, args) => __awaiter(this, void 0, void 0, function* () {
                        debugger;
                        if (util_3.isNullOrUndefined(args) || Object.keys(args).length <= 0) {
                            throw new Error("No conditions specified in userDelete. Prevented deleting all posts.");
                        }
                        if (args._id)
                            args._id = mongoose_7.default.Types.ObjectId(args._id);
                        const { Many } = args;
                        if (typeof args.Many !== "undefined")
                            delete args.Many;
                        return yield Shadow.DeleteFromDB("Post", args, Many).then((res) => res.result);
                    })
                }
            }));
        }
    };
});
System.register("server/models/Image.model", ["server/ShadowMS/classes/Model", "mongoose"], function (exports_13, context_13) {
    "use strict";
    var Model_4, mongoose_8, ImageSchema, Image;
    var __moduleName = context_13 && context_13.id;
    return {
        setters: [
            function (Model_4_1) {
                Model_4 = Model_4_1;
            },
            function (mongoose_8_1) {
                mongoose_8 = mongoose_8_1;
            }
        ],
        execute: function () {
            ImageSchema = new mongoose_8.default.Schema({
                Img: String
            });
            exports_13("Image", Image = new Model_4.default("Image", ImageSchema, "Images"));
        }
    };
});
System.register("server/setupDb", ["mongoose", "dotenv"], function (exports_14, context_14) {
    "use strict";
    var mongoose_9, dotenv_1;
    var __moduleName = context_14 && context_14.id;
    return {
        setters: [
            function (mongoose_9_1) {
                mongoose_9 = mongoose_9_1;
            },
            function (dotenv_1_1) {
                dotenv_1 = dotenv_1_1;
            }
        ],
        execute: function () {
            exports_14("default", () => __awaiter(this, void 0, void 0, function* () {
                const _env = process.env["NODE_ENV"] || "dev";
                if (_env === "production")
                    dotenv_1.default.config();
                else
                    dotenv_1.default.config({ path: "./dev.env" });
                yield mongoose_9.default
                    .connect(String(process.env["DB_LINK"]), {
                    useNewUrlParser: true
                })
                    .catch(err => {
                    console.error(err);
                    throw new Error("Cannot connect to the Database");
                });
                return mongoose_9.default.connection;
            }));
        }
    };
});
System.register("server/ShadowMS/classes/Route", [], function (exports_15, context_15) {
    "use strict";
    var Route;
    var __moduleName = context_15 && context_15.id;
    return {
        setters: [],
        execute: function () {
            Route = class Route {
                constructor(path, handlerConstruct) {
                    this.path = path;
                    this.handler = handlerConstruct;
                }
            };
            exports_15("default", Route);
        }
    };
});
System.register("server/routes/active", ["server/ShadowMS/classes/Route", "express"], function (exports_16, context_16) {
    "use strict";
    var Route_1, express_1, router, handlerConstructor, ActiveRoute;
    var __moduleName = context_16 && context_16.id;
    return {
        setters: [
            function (Route_1_1) {
                Route_1 = Route_1_1;
            },
            function (express_1_1) {
                express_1 = express_1_1;
            }
        ],
        execute: function () {
            router = express_1.default.Router();
            handlerConstructor = (Shadow) => router.get("/", (req, res, next) => __awaiter(this, void 0, void 0, function* () {
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
            exports_16("ActiveRoute", ActiveRoute = new Route_1.default("/active", handlerConstructor));
        }
    };
});
System.register("server/routes/logout", ["server/ShadowMS/classes/Route", "express"], function (exports_17, context_17) {
    "use strict";
    var Route_2, express_2, router, handlerConstructor, LogoutRoute;
    var __moduleName = context_17 && context_17.id;
    return {
        setters: [
            function (Route_2_1) {
                Route_2 = Route_2_1;
            },
            function (express_2_1) {
                express_2 = express_2_1;
            }
        ],
        execute: function () {
            router = express_2.default.Router();
            handlerConstructor = (_Shadow) => router.get("*", (_req, res) => {
                res.clearCookie("UserID")
                    .redirect("/login");
            });
            exports_17("LogoutRoute", LogoutRoute = new Route_2.default("/logout", handlerConstructor));
        }
    };
});
System.register("server/ShadowMS/classes/APIRoute", [], function (exports_18, context_18) {
    "use strict";
    var APIRoute;
    var __moduleName = context_18 && context_18.id;
    return {
        setters: [],
        execute: function () {
            APIRoute = class APIRoute {
                constructor(method, path, handler) {
                    this.method = method;
                    this.path = path;
                    this.handler = handler;
                }
            };
            exports_18("default", APIRoute);
        }
    };
});
System.register("server/api/img.post", ["server/ShadowMS/classes/APIRoute", "server/ShadowMS/functions/prepare"], function (exports_19, context_19) {
    "use strict";
    var APIRoute_1, prepare_4, path, method, handler, ImgPostRoute;
    var __moduleName = context_19 && context_19.id;
    return {
        setters: [
            function (APIRoute_1_1) {
                APIRoute_1 = APIRoute_1_1;
            },
            function (prepare_4_1) {
                prepare_4 = prepare_4_1;
            }
        ],
        execute: function () {
            path = '/img';
            method = 'POST';
            handler = (Shadow) => (req, res) => {
                let { Img, Ext } = req.body;
                if (Img && Ext) {
                    if (!/data:image\/\w{3,5}.*/.test(Img)) {
                        Img = `data:image/${Ext};base64,${Img}`;
                    }
                    const r = {
                        Img: null,
                        error: null,
                    };
                    return Shadow.AddToDB('Image', { Img })
                        .then(model => {
                        r.Img = prepare_4.default(model);
                    })
                        .catch(err => {
                        r.error = new Error(err);
                    })
                        .finally(() => {
                        if (r.error) {
                            res.statusCode = 400;
                        }
                        res.send(r);
                    });
                }
                return res.send({
                    Img: null,
                    error: new Error('Invalid Image body / No Extension'),
                });
            };
            exports_19("ImgPostRoute", ImgPostRoute = new APIRoute_1.default(method, path, handler));
        }
    };
});
System.register("server/api/img.get", ["server/ShadowMS/classes/APIRoute", "server/ShadowMS/functions/extract"], function (exports_20, context_20) {
    "use strict";
    var APIRoute_2, extract_4, path, method, handler, ImgGetRoute;
    var __moduleName = context_20 && context_20.id;
    return {
        setters: [
            function (APIRoute_2_1) {
                APIRoute_2 = APIRoute_2_1;
            },
            function (extract_4_1) {
                extract_4 = extract_4_1;
            }
        ],
        execute: function () {
            path = '/img';
            method = 'GET';
            handler = (Shadow) => (req, res) => {
                Shadow.GetFromDB("Image", { _id: req.query["id"] }, 1)
                    .then(r => extract_4.extract(r))
                    .then(r => {
                    if (r && r.Img)
                        return r.Img;
                    throw new Error(`Image: "${req.query["id"]}" not found`);
                })
                    .then((img) => {
                    const Image = new Buffer(img.split(",")[1], "base64");
                    const ex = /data:image\/(.*);base64/.exec(img);
                    const type = `image/${ex ? ex[1] : "jpeg"}`;
                    res.header("Content-Type", type);
                    res.send(Image);
                })
                    .catch(err => {
                    console.error(err);
                    res.status(404).send("");
                });
            };
            exports_20("ImgGetRoute", ImgGetRoute = new APIRoute_2.default(method, path, handler));
        }
    };
});
System.register("server/app", ["./ShadowMS", "server/models/Comment.model", "server/models/User.model", "server/models/Post.model", "server/models/Image.model", "express", "compression", "zlib", "body-parser", "cookie-parser", "path", "server/setupDb", "mongoose", "./routes", "server/routes/active", "server/routes/logout", "server/api/img.post", "server/api/img.get"], function (exports_21, context_21) {
    "use strict";
    var ShadowMS_1, Comment_model_1, User_model_1, Post_model_1, Image_model_1, express_3, compression_1, zlib_1, body_parser_1, cookie_parser_1, path_1, setupDb_1, mongoose_10, routes_1, active_1, logout_1, img_post_1, img_get_1, app;
    var __moduleName = context_21 && context_21.id;
    return {
        setters: [
            function (ShadowMS_1_1) {
                ShadowMS_1 = ShadowMS_1_1;
            },
            function (Comment_model_1_1) {
                Comment_model_1 = Comment_model_1_1;
            },
            function (User_model_1_1) {
                User_model_1 = User_model_1_1;
            },
            function (Post_model_1_1) {
                Post_model_1 = Post_model_1_1;
            },
            function (Image_model_1_1) {
                Image_model_1 = Image_model_1_1;
            },
            function (express_3_1) {
                express_3 = express_3_1;
            },
            function (compression_1_1) {
                compression_1 = compression_1_1;
            },
            function (zlib_1_1) {
                zlib_1 = zlib_1_1;
            },
            function (body_parser_1_1) {
                body_parser_1 = body_parser_1_1;
            },
            function (cookie_parser_1_1) {
                cookie_parser_1 = cookie_parser_1_1;
            },
            function (path_1_1) {
                path_1 = path_1_1;
            },
            function (setupDb_1_1) {
                setupDb_1 = setupDb_1_1;
            },
            function (mongoose_10_1) {
                mongoose_10 = mongoose_10_1;
            },
            function (routes_1_1) {
                routes_1 = routes_1_1;
            },
            function (active_1_1) {
                active_1 = active_1_1;
            },
            function (logout_1_1) {
                logout_1 = logout_1_1;
            },
            function (img_post_1_1) {
                img_post_1 = img_post_1_1;
            },
            function (img_get_1_1) {
                img_get_1 = img_get_1_1;
            }
        ],
        execute: function () {
            setupDb_1.default();
            exports_21("app", app = new ShadowMS_1.default(mongoose_10.default.connection, [Comment_model_1.Comment, User_model_1.User, Post_model_1.Post, Image_model_1.Image], [
                body_parser_1.default.json({ limit: "50mb" }),
                body_parser_1.default.urlencoded({ extended: false }),
                cookie_parser_1.default(),
                express_3.default.static(path_1.default.join(__dirname, "../client/assets/")),
                express_3.default.static(path_1.default.join(__dirname, "./public/")),
                compression_1.default({
                    level: zlib_1.default.Z_BEST_SPEED,
                    filter: (req, res) => {
                        if (req.headers['x-no-compression']) {
                            return false;
                        }
                        return compression_1.default.filter(req, res);
                    }
                })
            ], [active_1.ActiveRoute, logout_1.LogoutRoute, routes_1.IndexRoute], [img_post_1.ImgPostRoute, img_get_1.ImgGetRoute], (err) => console.dir(new Error(err), { colors: true }), [Comment_model_1.CommentSchema, User_model_1.UserSchema, Post_model_1.PostSchema], [Comment_model_1.CommentResolver, User_model_1.UserResolver, Post_model_1.PostResolver]));
        }
    };
});
System.register("server/ShadowMS/decorators/_helpers", [], function (exports_22, context_22) {
    "use strict";
    var descriptorIsFunc;
    var __moduleName = context_22 && context_22.id;
    return {
        setters: [],
        execute: function () {
            exports_22("descriptorIsFunc", descriptorIsFunc = (key, func) => {
                if (!(typeof func === 'function')) {
                    throw Error(`${key} is not a function!`);
                }
                return true;
            });
        }
    };
});
System.register("server/ShadowMS/decorators/debug", ["server/ShadowMS/decorators/_helpers"], function (exports_23, context_23) {
    "use strict";
    var _helpers_1, Timer, TryChatch;
    var __moduleName = context_23 && context_23.id;
    return {
        setters: [
            function (_helpers_1_1) {
                _helpers_1 = _helpers_1_1;
            }
        ],
        execute: function () {
            exports_23("Timer", Timer = (label) => (_target, _name, descriptor) => {
                const original = descriptor.value;
                if (typeof original === 'function') {
                    descriptor.value = function (...args) {
                        console.time(label);
                        debugger;
                        try {
                            const result = original.apply(this, args);
                            return result;
                        }
                        catch (e) {
                            console.log(`Error: ${e}`);
                            throw e;
                        }
                        finally {
                            console.log(`${label}->${JSON.stringify(args)}`);
                            console.timeEnd(label);
                            console.log();
                        }
                    };
                }
                return descriptor;
            });
            exports_23("TryChatch", TryChatch = (errorHandler) => {
                if (!(typeof errorHandler === 'function') && errorHandler) {
                    throw Error(`The ErrorHandler should be a function. ${JSON.stringify(errorHandler)} is not a function`);
                }
                return (_target, key, descriptor) => {
                    const func = descriptor.value;
                    _helpers_1.descriptorIsFunc(key, func);
                    descriptor.value = function (...args) {
                        let res;
                        try {
                            res = func.apply(this, args);
                        }
                        catch (e) {
                            ;
                            (errorHandler || console.error)(e);
                        }
                        return res;
                    };
                    return descriptor;
                };
            });
        }
    };
});
System.register("server/ShadowMS/index", ["mongoose", "express", "apollo-server-express", "path", "nodemailer", "server/ShadowMS/functions/extract", "server/ShadowMS/functions/prepare", "server/ShadowMS/decorators/debug"], function (exports_24, context_24) {
    "use strict";
    var _a, _b, _c, mongoose_11, express_4, apollo_server_express_4, path, nodemailer_1, extract_5, prepare_5, debug_1, Shadow;
    var __moduleName = context_24 && context_24.id;
    return {
        setters: [
            function (mongoose_11_1) {
                mongoose_11 = mongoose_11_1;
            },
            function (express_4_1) {
                express_4 = express_4_1;
            },
            function (apollo_server_express_4_1) {
                apollo_server_express_4 = apollo_server_express_4_1;
            },
            function (path_2) {
                path = path_2;
            },
            function (nodemailer_1_1) {
                nodemailer_1 = nodemailer_1_1;
            },
            function (extract_5_1) {
                extract_5 = extract_5_1;
            },
            function (prepare_5_1) {
                prepare_5 = prepare_5_1;
            },
            function (debug_1_1) {
                debug_1 = debug_1_1;
            }
        ],
        execute: function () {
            "use strict";
            Shadow = class Shadow {
                constructor(dbConnection, dbSchemas, middleware, routes, APIRoutes, CatchHandler, graphqlSchemas, graphqlResolvers) {
                    this.db = dbConnection;
                    this.dbSchemas = dbSchemas;
                    this.dbModels = {};
                    this.port = Number(process.env["PORT"]);
                    this.middleware = middleware;
                    this.routes = routes;
                    this.APIRoutes = APIRoutes;
                    this._env = process.env["NODE_ENV"] || "dev";
                    this.data = {
                        origin: this._env === "production"
                            ? process.env["HOST"]
                            : `${process.env["HOST"]}${process.env["PORT"]
                                ? `:${process.env["PORT"]}`
                                : ""}`,
                        nonActiveUsers: {}
                    };
                    this.CatchHandler = CatchHandler;
                    this.mail = nodemailer_1.default.createTransport({
                        service: "gmail",
                        auth: {
                            user: process.env["EMAIL"],
                            pass: process.env["EMAIL_PASS"]
                        }
                    }, {
                        from: "media.sqrl@gmail.com"
                    });
                    this.app = express_4.default();
                    this.apollo = this.InitApollo(graphqlSchemas, graphqlResolvers);
                    this.app.on("update", this.UpdateData.bind(this));
                    this.CreateServer(this.port, process.env["HOST"]);
                    this.Init();
                    this.stdin = process.openStdin();
                    this.stdin.addListener("data", this.inputHandler.bind(this));
                }
                inputHandler(_d) {
                    const d = String(_d).trim();
                    (function () {
                        function print(txt, ...args) {
                            console.dir(txt, Object.assign({ colors: true, depth: 8 }, args));
                        }
                        try {
                            print(eval(d));
                        }
                        catch (e) {
                            print(e);
                        }
                    }).bind(this)();
                }
                InitApollo(graphqlSchemas, graphqlResolvers) {
                    const schema = apollo_server_express_4.mergeSchemas({
                        schemas: graphqlSchemas,
                        resolvers: graphqlResolvers
                            .map(constr => constr(this))
                            .reduce((acc, x) => ({
                            Mutation: Object.assign({}, acc.Mutation, x.Mutation),
                            Query: Object.assign({}, acc.Query, x.Query)
                        }), { Query: {}, Mutation: {} })
                    });
                    const apollo = new apollo_server_express_4.ApolloServer({
                        schema,
                        context: (x) => ({
                            x
                        })
                    });
                    apollo.applyMiddleware({ app: this.app });
                    return apollo;
                }
                InitMiddleware() {
                    this.middleware.forEach(mdlw => this.app.use(mdlw));
                }
                InitRoutes() {
                    this.routes.forEach((route) => {
                        const passedData = this;
                        this.app.use(route.path, route.handler(passedData));
                    });
                }
                InitAPI() {
                    this.APIRoutes.forEach((route) => {
                        const handler = route.handler(this);
                        switch (route.method) {
                            case "GET":
                                this.app.get(route.path, handler);
                                break;
                            case "POST":
                                this.app.post(route.path, handler);
                                break;
                            case "PUT":
                                this.app.put(route.path, handler);
                                break;
                            case "DELETE":
                                this.app.delete(route.path, handler);
                                break;
                            default:
                                ;
                                break;
                        }
                    }, this);
                }
                InitModels() {
                    this.dbSchemas.forEach((schema) => {
                        const newModel = this.db.model(schema.name, schema.schema, schema.collection);
                        this.dbModels[schema.name] = newModel;
                    });
                }
                InitErrorHandler() {
                    this.app.use((err, _, res) => {
                        if (!res.headersSent) {
                            res.status(500);
                            res.render('error', { error: err });
                        }
                    });
                }
                CreateServer(port, host) {
                    this.app.listen(port, () => {
                        console.info('\x1b[32m%s\x1b[0m', ` Listening at ${host}:${port}`);
                    });
                }
                Init() {
                    this.app.set("views", path.join(__dirname, "..", "views"));
                    this.app.set("view engine", "pug");
                    this.InitMiddleware();
                    this.InitAPI();
                    this.InitModels();
                    this.UpdateData();
                    this.InitRoutes();
                    this.InitErrorHandler();
                    console.info("\x1b[36m%s\x1b[0m", " Ready for Action 👊");
                }
                GetFromCache(modelName, conditions = {}, limit = Number.MAX_SAFE_INTEGER) {
                    const modelCache = this.data[modelName];
                    if (modelCache) {
                        const founds = modelCache.filter(x => {
                            const cKeys = Object.keys(conditions);
                            let likeIt = true;
                            for (let i = 0; likeIt && i < cKeys.length; i++) {
                                const prop = cKeys[i];
                                const [cVal, xVal] = [conditions[prop], x[prop]];
                                if (Array.isArray(cVal) && Array.isArray(xVal)) {
                                    likeIt = cVal.sort().toString() === xVal.sort().toString();
                                }
                                else if (cVal._bsontype === "ObjectID" || xVal._bsontype === "ObjectID") {
                                    likeIt = String(cVal) === String(xVal);
                                }
                                else if (typeof cVal === "object" && typeof xVal === "object") {
                                    likeIt = Object.is(cVal, xVal);
                                }
                                else if (typeof cVal !== typeof xVal) {
                                    likeIt = !!(String(cVal) === String(xVal));
                                }
                                else
                                    likeIt = cVal === xVal;
                            }
                            return likeIt;
                        });
                        if (!+limit)
                            return founds;
                        else if (limit === 1 && founds.length >= 1)
                            return founds[0];
                        return founds.slice(0, limit);
                    }
                    return null;
                }
                GetFromDB(modelName, conditions = {}, limit = Number.MAX_SAFE_INTEGER) {
                    return __awaiter(this, void 0, void 0, function* () {
                        const fromCache = this.GetFromCache(modelName, conditions, limit);
                        if (Array.isArray(fromCache) ? fromCache.length > 0 : fromCache)
                            return fromCache;
                        else {
                            let out = [];
                            yield this.dbModels[modelName].find(conditions).limit(limit)
                                .then(d => out = d)
                                .then(res => {
                                if (Array.isArray(res)) {
                                    for (const item of res) {
                                        if (this.data[modelName].some((x) => String(x._id) === item._id)) {
                                            this.data[modelName].push(item);
                                        }
                                    }
                                }
                                else if (res) {
                                    if (this.data[modelName].some((x) => String(x._id) === res._id)) {
                                        this.data[modelName].push(res);
                                    }
                                }
                            })
                                .catch(err => new Error(err));
                            return out;
                        }
                    });
                }
                AddToDB(modelName, modelArguments) {
                    return __awaiter(this, void 0, void 0, function* () {
                        const model = this.dbModels[modelName];
                        if (!model) {
                            throw new Error(`Model: ${modelName} not found!`);
                        }
                        const response = yield model.create(modelArguments)
                            .then(doc => {
                            this.data[modelName].push(doc);
                            return doc;
                        })
                            .catch(err => { throw new Error(err); });
                        return response;
                    });
                }
                UpdateDB(modelName, query, data, options = {}) {
                    return __awaiter(this, void 0, void 0, function* () {
                        let output;
                        yield this.dbModels[modelName].update(query, data, options)
                            .then(res => output = res)
                            .then(_ => this.app.emit("update", modelName))
                            .catch(err => output = err);
                        return output;
                    });
                }
                DeleteFromDB(modelName, query, single) {
                    return __awaiter(this, void 0, void 0, function* () {
                        let output;
                        const collection = this.dbModels[modelName] && this.dbModels[modelName].collection;
                        if (!collection)
                            throw new Error(`Collection ${collection} not found`);
                        yield collection.remove(query, {
                            single
                        })
                            .then(res => output = res)
                            .then(_ => this.app.emit("update", modelName))
                            .catch(err => output = err);
                        return output;
                    });
                }
                AddProp(modelName, propName, value) {
                    return __awaiter(this, void 0, void 0, function* () {
                        let out;
                        yield this.dbModels[modelName]
                            .update({}, { [propName]: value }, { multi: true, overwrite: false })
                            .then(res => out = res)
                            .then(_ => this.app.emit("update", modelName))
                            .catch(err => out = err);
                        return out;
                    });
                }
                UpdateData(...modelNames) {
                    return __awaiter(this, void 0, void 0, function* () {
                        if (modelNames.length > 0) {
                            yield modelNames.forEach((modelName) => __awaiter(this, void 0, void 0, function* () {
                                yield this.dbModels[modelName].find()
                                    .then(res => this.data[modelName] = res)
                                    .catch(this.CatchHandler);
                            }), this);
                        }
                        else {
                            for (const modelName in this.dbModels) {
                                try {
                                    yield this.dbModels[modelName].find()
                                        .then(res => this.data[modelName] = res)
                                        .catch(this.CatchHandler);
                                }
                                catch (err) {
                                    console.error(new Error(err));
                                }
                            }
                        }
                    });
                }
                SendRegConfirm(to, confirmationID) {
                    if (!process.env["EMAIL"])
                        throw new Error(`process.env["EMAIL"] is undefined`);
                    if (!to || !confirmationID)
                        throw new Error(`User credentials not specified`);
                    let out;
                    const mailOptions = {
                        from: process.env["EMAIL"],
                        to,
                        subject: "SQRL Media Registration Confirmation",
                        html: `
				<a href="${this.data.origin}/active?id=${confirmationID}">
					Activate your account
				</a>
			`
                    };
                    this.mail.sendMail(mailOptions)
                        .then(() => out = true)
                        .catch(err => {
                        out = false;
                        this.CatchHandler(err);
                    });
                    return out;
                }
                Resolve(input, modelName) {
                    return __awaiter(this, void 0, void 0, function* () {
                        if (Array.isArray(input)) {
                            let out = [];
                            for (const id of input.map(String)) {
                                const toOut = prepare_5.default(extract_5.extract(yield this.GetFromDB(modelName, { _id: id })));
                                out.push(toOut);
                            }
                            return out;
                        }
                        else {
                            return prepare_5.default(extract_5.extract(yield this.GetFromDB(modelName, { _id: String(input._id) })));
                        }
                    });
                }
            };
            __decorate([
                debug_1.TryChatch(),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", [Object]),
                __metadata("design:returntype", void 0)
            ], Shadow.prototype, "inputHandler", null);
            __decorate([
                debug_1.TryChatch(),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", [Array, Array]),
                __metadata("design:returntype", void 0)
            ], Shadow.prototype, "InitApollo", null);
            __decorate([
                debug_1.TryChatch(),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], Shadow.prototype, "InitMiddleware", null);
            __decorate([
                debug_1.TryChatch(),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], Shadow.prototype, "InitRoutes", null);
            __decorate([
                debug_1.TryChatch(),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], Shadow.prototype, "InitAPI", null);
            __decorate([
                debug_1.TryChatch(),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], Shadow.prototype, "InitModels", null);
            __decorate([
                debug_1.TryChatch(),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", [Number, String]),
                __metadata("design:returntype", void 0)
            ], Shadow.prototype, "CreateServer", null);
            __decorate([
                debug_1.TryChatch(),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", [String, Object, Object]),
                __metadata("design:returntype", void 0)
            ], Shadow.prototype, "GetFromCache", null);
            __decorate([
                debug_1.TryChatch(),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", [String, Object, Object]),
                __metadata("design:returntype", Promise)
            ], Shadow.prototype, "GetFromDB", null);
            __decorate([
                debug_1.TryChatch(),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", [String, typeof (_a = typeof ModelSchema !== "undefined" && ModelSchema) === "function" && _a || Object]),
                __metadata("design:returntype", Promise)
            ], Shadow.prototype, "AddToDB", null);
            __decorate([
                debug_1.TryChatch(),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", [String, Object, Object, Object]),
                __metadata("design:returntype", Promise)
            ], Shadow.prototype, "UpdateDB", null);
            __decorate([
                debug_1.TryChatch(),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", [String, Object, Boolean]),
                __metadata("design:returntype", Promise)
            ], Shadow.prototype, "DeleteFromDB", null);
            __decorate([
                debug_1.TryChatch(),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", [String, String, typeof (_b = typeof T !== "undefined" && T) === "function" && _b || Object]),
                __metadata("design:returntype", Promise)
            ], Shadow.prototype, "AddProp", null);
            __decorate([
                debug_1.TryChatch(),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", [String]),
                __metadata("design:returntype", Promise)
            ], Shadow.prototype, "UpdateData", null);
            __decorate([
                debug_1.TryChatch(),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", [Object, String]),
                __metadata("design:returntype", Promise)
            ], Shadow.prototype, "Resolve", null);
            exports_24("default", Shadow);
        }
    };
});
System.register("server/ShadowMS/functions/compare", [], function (exports_25, context_25) {
    "use strict";
    var compareArray;
    var __moduleName = context_25 && context_25.id;
    return {
        setters: [],
        execute: function () {
            exports_25("compareArray", compareArray = (a1, a2) => {
                if (a1.length !== a2.length)
                    return false;
                let theSame = true;
                const a1s = a1.slice().sort();
                const a2s = a2.slice().sort();
                for (let i = 0; i < a1.length && theSame; i++) {
                    const [v1, v2] = [a1s[i], a2s[i]];
                    if (Array.isArray(a1[i]) && Array.isArray(a2[i])) {
                        theSame = compareArray(v1, v2)
                            ? theSame
                            : false;
                    }
                    else if (typeof v1 === "object" && typeof v2 === "object") {
                        theSame = Object.is(v1, v2)
                            ? theSame
                            : false;
                    }
                    else {
                        theSame = v1 === v2;
                    }
                }
                return theSame;
            });
        }
    };
});
System.register("server/ShadowMS/functions/cookieToObjArr", [], function (exports_26, context_26) {
    "use strict";
    var __moduleName = context_26 && context_26.id;
    return {
        setters: [],
        execute: function () {
            exports_26("default", (cookie) => {
                const arr = cookie.split("=");
                const output = {};
                for (let i = 0; i < arr.length && arr[i]; i += 2) {
                    output[arr[i]] = arr[i + 1];
                }
                return output;
            });
        }
    };
});
System.register("server/ShadowMS/functions/formatDate", [], function (exports_27, context_27) {
    "use strict";
    var isTeen;
    var __moduleName = context_27 && context_27.id;
    return {
        setters: [],
        execute: function () {
            isTeen = (num) => num - 10 < 10 && num - 10 > 0;
            exports_27("default", (post) => {
                let daySuffix;
                const Date = (post.Date.split(",").length <= 1
                    ? post.Date.split(" ").slice()
                    : post.Date.split(",").slice())
                    .map(Number)
                    .filter(Boolean);
                const day = Date[2];
                const formattedPost = Object.assign({}, post._doc);
                if (isTeen(day))
                    daySuffix = "th";
                else if (day - Math.floor(day / 10) * 10 === 1)
                    daySuffix = "st";
                else if (day - Math.floor(day / 10) * 10 === 2)
                    daySuffix = "nd";
                else if (day - Math.floor(day / 10) * 10 === 3)
                    daySuffix = "rd";
                else
                    daySuffix = "th";
                formattedPost.Date = `${Date[1]} ${Date[2] + daySuffix} ${Date[0]}`;
                return formattedPost;
            });
        }
    };
});
System.register("server/ShadowMS/functions/formatPages", [], function (exports_28, context_28) {
    "use strict";
    var __moduleName = context_28 && context_28.id;
    return {
        setters: [],
        execute: function () {
            exports_28("default", (data, modelName) => data[modelName].map((page) => ({
                Name: page.Name,
                Href: `${data.origin}${page.Href}`
            })));
        }
    };
});
System.register("server/ShadowMS/functions/stringToNumArray", [], function (exports_29, context_29) {
    "use strict";
    var __moduleName = context_29 && context_29.id;
    return {
        setters: [],
        execute: function () {
            exports_29("default", (string, separator) => string.slice().split(separator).map(Number));
        }
    };
});
System.register("server/ShadowMS/functions/toPromise", [], function (exports_30, context_30) {
    "use strict";
    var __moduleName = context_30 && context_30.id;
    return {
        setters: [],
        execute: function () {
            exports_30("default", (data) => new Promise((res) => {
                let copy;
                if (Array.isArray(data))
                    copy = data.slice();
                else if (typeof data === "object")
                    copy = Object.assign({}, data);
                else
                    copy = data;
                return res(copy);
            }));
        }
    };
});
System.register("server/ShadowMS/functions/userRenderProps", [], function (exports_31, context_31) {
    "use strict";
    var __moduleName = context_31 && context_31.id;
    return {
        setters: [],
        execute: function () {
            exports_31("default", (id, users) => users.find(user => String(user._id) === String(id)));
        }
    };
});
System.register("server/routes/index", ["server/ShadowMS/classes/Route", "express"], function (exports_32, context_32) {
    "use strict";
    var Route_3, express_5, router, handlerConstructor, IndexRoute;
    var __moduleName = context_32 && context_32.id;
    return {
        setters: [
            function (Route_3_1) {
                Route_3 = Route_3_1;
            },
            function (express_5_1) {
                express_5 = express_5_1;
            }
        ],
        execute: function () {
            router = express_5.default.Router();
            handlerConstructor = (_Shadow) => router.get("*", (_req, res) => {
                res.render("layout", {});
            });
            exports_32("IndexRoute", IndexRoute = new Route_3.default("*", handlerConstructor));
        }
    };
});
System.register("server/schemaTypes/Name.type", ["mongoose"], function (exports_33, context_33) {
    "use strict";
    var mongoose_12, Name;
    var __moduleName = context_33 && context_33.id;
    return {
        setters: [
            function (mongoose_12_1) {
                mongoose_12 = mongoose_12_1;
            }
        ],
        execute: function () {
            Name = class Name extends mongoose_12.default.SchemaType {
                constructor(key, options) {
                    super(key, options, "Name");
                }
                cast(val) {
                    if (!val || !val.First || !val.Last) {
                        throw new Error(`Name: {First: ${val.First}, Last: ${val.Last}} is not assignable to the type Name`);
                    }
                    return val;
                }
            };
            exports_33("Name", Name);
            mongoose_12.default.SchemaTypes.Name = Name;
        }
    };
});
System.register("client/src/dtos/image.dto", ["class-validator"], function (exports_34, context_34) {
    "use strict";
    var class_validator_4, Image;
    var __moduleName = context_34 && context_34.id;
    return {
        setters: [
            function (class_validator_4_1) {
                class_validator_4 = class_validator_4_1;
            }
        ],
        execute: function () {
            Image = class Image {
                constructor(Img) {
                    this.Img = Img;
                }
            };
            __decorate([
                class_validator_4.IsBase64(),
                __metadata("design:type", String)
            ], Image.prototype, "Img", void 0);
            exports_34("Image", Image);
        }
    };
});
