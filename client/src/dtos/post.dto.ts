import { IsString, IsInt, IsMongoId, IsBoolean, IsInstance } from "class-validator"
import mongoose from "mongoose"
import { Comment } from "./comment.dto"
import { User } from "./user.dto"

export class Post {
	@IsMongoId() readonly _id: mongoose.Types.ObjectId
	@IsInstance(User) readonly Author: User
	@IsString()  readonly Date: string
	@IsString()  readonly Content: string
	@IsInt()     readonly Likes: number
	@IsBoolean() readonly Edited: boolean
	@IsString()  readonly Image?: string
	@IsInstance(Comment, {each: true}) Comments: Comment[]

	constructor(
		_id: mongoose.Types.ObjectId,
		Author: User,
		Date: string,
		Content: string,
		Likes: number,
		Edited: boolean,
		Image?: string,
		Comments: Comment[] = []
	) {
		this._id = _id
		this.Author = Author
		this.Date = Date
		this.Content = Content
		this.Likes = Likes
		this.Edited = Edited
		this.Image = Image
		this.Comments = Comments
	}
}
