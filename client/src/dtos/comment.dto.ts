import { IsDate, IsString, IsMongoId } from "class-validator"
import mongoose from "mongoose"

export class Comment {
	@IsMongoId() readonly _id: mongoose.Types.ObjectId
	@IsMongoId() readonly Author: mongoose.Types.ObjectId
	@IsDate() readonly Date: string
	@IsString() readonly Content: string
  @IsMongoId() readonly Post: mongoose.Types.ObjectId
  
  constructor(
    _id: mongoose.Types.ObjectId,
    Author: mongoose.Types.ObjectId,
    Date: string,
    Content: string,
    Post: mongoose.Types.ObjectId,
  ) {
    this._id = _id
    this.Author = Author
    this.Date = Date
    this.Content = Content
    this.Post = Post
  }	
}