"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a, _b, _c;
"use strict";
const mongoose_1 = __importDefault(require("mongoose"));
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const path = __importStar(require("path"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const extract_1 = require("./functions/extract");
const prepare_1 = __importDefault(require("./functions/prepare"));
const debug_1 = require("./decorators/debug");
class Shadow {
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
        this.app = express_1.default();
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
        const schema = apollo_server_express_1.mergeSchemas({
            schemas: graphqlSchemas,
            resolvers: graphqlResolvers
                .map(constr => constr(this))
                .reduce((acc, x) => ({
                Mutation: Object.assign({}, acc.Mutation, x.Mutation),
                Query: Object.assign({}, acc.Query, x.Query)
            }), { Query: {}, Mutation: {} })
        });
        const apollo = new apollo_server_express_1.ApolloServer({
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
                    const toOut = prepare_1.default(extract_1.extract(yield this.GetFromDB(modelName, { _id: id })));
                    out.push(toOut);
                }
                return out;
            }
            else {
                return prepare_1.default(extract_1.extract(yield this.GetFromDB(modelName, { _id: String(input._id) })));
            }
        });
    }
}
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
exports.default = Shadow;
