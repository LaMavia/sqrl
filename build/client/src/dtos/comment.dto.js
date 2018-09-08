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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
const mongoose_1 = __importDefault(require("mongoose"));
const user_dto_1 = require("./user.dto");
const post_dto_1 = require("./post.dto");
class Comment {
    constructor(_id, Author, Date, Content, Post) {
        this._id = _id;
        this.Author = Author;
        this.Date = Date;
        this.Content = Content;
        this.Post = Post;
    }
}
__decorate([
    class_validator_1.IsMongoId(),
    __metadata("design:type", mongoose_1.default.Types.ObjectId)
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
exports.Comment = Comment;
