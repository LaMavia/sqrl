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
    Login: string
    Password: string // hashed using bcrypt
    Email: string

    Name: string // Both firstname and lastname
    Desc: string
    BirthDate: string // YYYY MM DD
    Img: string
    Type: string // User / Admin
  } interface User extends IUser, mongoose.Document {
    _id: string
  }
}

export default Models