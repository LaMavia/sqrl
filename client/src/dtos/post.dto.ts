import { IsDate, IsString, IsInt, IsMongoId, IsBoolean, IsInstance } from "class-validator"
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

export class Post {
	@IsMongoId() readonly _id: mongoose.Types.ObjectId
	@IsMongoId() readonly Author: mongoose.Types.ObjectId
	@IsString()  readonly Date: string
	@IsString()  readonly Content: string
	@IsInt()     readonly Likes: number
	@IsBoolean() readonly Edited: boolean
	@IsString()  readonly ImageURL?: string
	@IsInstance(Comment, {each: true}) Comments: Comment[]

	constructor(
		_id: mongoose.Types.ObjectId,
		Author: mongoose.Types.ObjectId,
		Date: string,
		Content: string,
		Likes: number,
		Edited: boolean,
		ImageURL?: string,
		Comments: Comment[] = []
	) {
		this._id = _id
		this.Author = Author
		this.Date = Date
		this.Content = Content
		this.Likes = Likes
		this.Edited = Edited
		this.ImageURL = ImageURL
		this.Comments = Comments
	}
}
