import * as mongoose from "mongoose"

declare namespace Models {
  interface IPost {
    Title: string
    Tags: string[]
    Desc: string
    Img: string
    Body: string
    Author: string
    Date: string
  } interface Post extends IPost, mongoose.Document {}

  interface INavPage {
    Name: string
    Href: string
  } interface NavPage extends INavPage, mongoose.Document {}

  interface IUser {
    Username: string
    Password: string // hashed using bcrypt
    Email: string

    Name: string // Both firstname and lastname
    ProfileImageURL: string
    BackgroundImageURL: string
    Followers: mongoose.Types.ObjectId[]
  } interface User extends IUser, mongoose.Document {
    _id: string
  }
}

export default Models