import {
	IsString,
	IsUrl,
	IsMongoId,
	IsEmail
} from "class-validator"
import mongoose from 'mongoose'

// export class Name {
// 	@IsString() readonly First: string
// 	@IsString() readonly Last: string
// 
// 	constructor(First: string, Last: string) {
// 		this.First = First
// 		this.Last = Last
// 	}
// }

export class User {
	@IsString() readonly Name: string
	@IsString() readonly Username: string
	@IsString() readonly Password: string
	@IsEmail() readonly Email: string
	@IsUrl() readonly ProfileImageURL: string
	@IsUrl() readonly BackgroundImageURL: string
	@IsMongoId({each: true}) readonly Followers: mongoose.Schema.Types.ObjectId[]

	constructor(
		Name: string,
		Username: string,
		Password: string,
		Email: string,
		ProfileImageURL: string,
		BackgroundImageURL: string,
		Followers: mongoose.Schema.Types.ObjectId[]
	) {
		this.Name = Name
		this.Username = Username
		this.Password = Password 
		this.Email = Email
		this.ProfileImageURL = ProfileImageURL
		this.BackgroundImageURL = BackgroundImageURL
		this.Followers = Followers
	}
}
