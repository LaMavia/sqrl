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
const bcrypt_1 = __importDefault(require("bcrypt"));
const Model_1 = __importDefault(require("../ShadowMS/classes/Model"));
const apollo_server_express_1 = require("apollo-server-express");
const hash_1 = __importDefault(require("../ShadowMS/functions/hash"));
const prepare_1 = __importDefault(require("../ShadowMS/functions/prepare"));
const util_1 = require("util");
const objectifyObjectsId_1 = __importDefault(require("../ShadowMS/functions/objectifyObjectsId"));
const sharedTypes_1 = __importDefault(require("./sharedTypes"));
const extract_1 = require("../ShadowMS/functions/extract");
exports.UserDBSchema = new mongoose_1.default.Schema({
    Name: String,
    Username: String,
    Password: String,
    Email: String,
    ProfileImageURL: String,
    BackgroundImageURL: String,
    Followers: [mongoose_1.default.Schema.Types.ObjectId],
    LikedPosts: [mongoose_1.default.Schema.Types.ObjectId]
});
exports.User = new Model_1.default("User", exports.UserDBSchema, "Users");
exports.UserSchema = apollo_server_express_1.makeExecutableSchema({
    typeDefs: apollo_server_express_1.gql `
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

		${sharedTypes_1.default}
	`
});
apollo_server_express_1.addMockFunctionsToSchema({
    schema: exports.UserSchema
});
exports.UserResolver = Shadow => ({
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
            const id = mongoose_1.default.Types.ObjectId.createFromTime(new Date().getUTCSeconds());
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
                if (util_1.isNullOrUndefined(data[prop]))
                    delete data[prop];
                if (prop === "Password")
                    data[prop] = yield hash_1.default(data[prop]);
            }
            return yield Shadow.UpdateDB("User", { _id: args._id }, data);
        }),
        userDelete: (_root, args) => __awaiter(this, void 0, void 0, function* () {
            if (util_1.isNullOrUndefined(args) || Object.keys(args).length <= 0) {
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
                    const user = prepare_1.default(extract_1.extract(res));
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
                    const user = extract_1.extract(yield Shadow.GetFromDB("User", Object.assign({ _id }, argsCopy), 1));
                    const followers = [];
                    for (const id of user.Followers.map(String)) {
                        const follower = prepare_1.default(extract_1.extract(yield Shadow.GetFromDB('User', {
                            _id: id,
                        })));
                        followers.push(follower);
                    }
                    res.push(Object.assign({}, user._doc, { Followers: followers }));
                }
            }
            else {
                res = prepare_1.default(yield Shadow.GetFromDB("User", args));
            }
            return res.map(prepare_1.default);
        }),
        Login: (_root, { Username, Password }) => __awaiter(this, void 0, void 0, function* () {
            const users = yield Shadow.GetFromDB("User", { Username });
            if (!users || users.length < 1)
                return null;
            const user = prepare_1.default(extract_1.extract(users));
            const samePassword = yield bcrypt_1.default.compare(Password, user.Password);
            if (samePassword) {
                const followers = yield Shadow.Resolve(user.Followers, "User");
                const out = Object.assign({}, user, { Followers: followers });
                return prepare_1.default(out);
            }
            return null;
        }),
        LoginWithID: (_root, { _id }) => __awaiter(this, void 0, void 0, function* () {
            const users = yield Shadow.GetFromDB("User", { _id: String(_id) });
            if (!users || users.length < 1)
                return null;
            const user = prepare_1.default(extract_1.extract(users));
            if (user) {
                const followers = yield Shadow.Resolve(user.Followers, "User");
                const out = Object.assign({}, user, { Followers: followers });
                return prepare_1.default(out);
            }
            return null;
        })
    }
});
