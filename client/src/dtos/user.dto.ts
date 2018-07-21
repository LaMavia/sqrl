import {
	IsString,
	IsInstance,
	IsUrl,
	IsArray,
	ValidateNested
} from "class-validator"
import { Post } from "./post.dto"

export class Name {
	@IsString() readonly First: string
	@IsString() readonly Last: string

	constructor(First: string, Last: string) {
		this.First = First
		this.Last = Last
	}
}

export class User {
	@IsInstance(Name) readonly Name: Name
	@IsString() readonly Username: string
	@IsUrl() readonly ProfileImageURL: string
	@IsUrl() readonly BackgroundImageURL: string
	@ValidateNested({ each: true })
    readonly Posts: Post[]
}
