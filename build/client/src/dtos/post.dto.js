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
const comment_dto_1 = require("./comment.dto");
const user_dto_1 = require("./user.dto");
class Post {
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
}
__decorate([
    class_validator_1.IsMongoId(),
    __metadata("design:type", mongoose_1.default.Types.ObjectId)
], Post.prototype, "_id", void 0);
__decorate([
    class_validator_1.IsInstance(user_dto_1.User),
    __metadata("design:type", user_dto_1.User)
], Post.prototype, "Author", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], Post.prototype, "Date", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], Post.prototype, "Content", void 0);
__decorate([
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], Post.prototype, "Likes", void 0);
__decorate([
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], Post.prototype, "Edited", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], Post.prototype, "Image", void 0);
__decorate([
    class_validator_1.IsInstance(comment_dto_1.Comment, { each: true }),
    __metadata("design:type", Array)
], Post.prototype, "Comments", void 0);
exports.Post = Post;
