import {
  IsDate,
  IsString,
  IsUrl,
  IsInt,
  IsMongoId,
  IsInstance
} from 'class-validator'
import mongoose from 'mongoose'
import { User } from "./user.dto"

export class Comment {
  @IsInstance(User) readonly Author: User
  @IsDate() readonly Date: string
  @IsString() readonly Content: string
}

export class Post {
  @IsMongoId() readonly _id: mongoose.Types.ObjectId
  @IsString() readonly Author: string
  @IsString() readonly Date: string
  @IsString() readonly Content: string
  @IsString() readonly ImageURL?: string
  @IsInt() readonly Likes: number
  readonly Comments: Comment[]
}