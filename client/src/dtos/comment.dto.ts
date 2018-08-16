import { IsDate, IsString, IsMongoId, IsInstance } from "class-validator"
import mongoose from "mongoose"
import { User } from "./user.dto"
import { Post } from "./post.dto"

export class Comment {
	@IsMongoId() readonly _id: mongoose.Types.ObjectId
	@IsInstance(User) readonly Author: User
	@IsDate() readonly Date: string
	@IsString() readonly Content: string
  @IsInstance(Post) readonly Post: Post
  
  constructor(
    _id: mongoose.Types.ObjectId,
    Author: User,
    Date: string,
    Content: string,
    Post: Post,
  ) {
    this._id = _id
    this.Author = Author
    this.Date = Date
    this.Content = Content
    this.Post = Post
  }	
}