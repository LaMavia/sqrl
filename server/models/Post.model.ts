import { addMockFunctionsToSchema, gql, makeExecutableSchema } from "apollo-server-express";
import { GraphQLSchema } from "graphql";
import mongoose from "mongoose";
import { isNullOrUndefined } from 'util';
import Model from "../ShadowMS/classes/Model";
import { extract } from "../ShadowMS/functions/extract";
import objectifyObjectsId from "../ShadowMS/functions/objectifyObjectsId";
import prepare from "../ShadowMS/functions/prepare";
import iShadow from "../ShadowMS/types/basic";
import sharedTypes from "./sharedTypes";
import { User } from "../../client/src/dtos/user.dto";

export const PostDBSchema = new mongoose.Schema({
	Author: mongoose.Schema.Types.ObjectId,
  Date: mongoose.Schema.Types.Date,
  Content: String,
  Likes: Number,
  Image: mongoose.Schema.Types.ObjectId,
  Edited: Boolean
})

export const Post = new Model("Post", PostDBSchema, "Posts")

export const PostSchema: GraphQLSchema = makeExecutableSchema({
  typeDefs: gql`
    type Query {
      Post(_id: ID, Author: ID, Date: String, Content: String, Likes: Int, Image: ID, Edited: Boolean): Post
      Posts(Author: ID, Date: String, Content: String, Likes: Int, Image: ID, Edited: Boolean, Limit: Int): [Post]
    }

    type Mutation {
      postAdd(Author: ID!, Content: String!, ImageID: String): Post
      postUpdate(_id: ID, Author: ID, Date: String, Content: String, Likes: Int, Image: ID, Many: Boolean = false): UpdateResult
      postDelete(_id: ID, Author: ID, Date: String, Content: String, Likes: Int, Image: ID, Many: Boolean = false): DeleteResult
    }

    ${sharedTypes}
  `
})
addMockFunctionsToSchema({
  schema: PostSchema
})

export const PostResolver: iShadow.ResolverConstruct<any, any> = Shadow => ({
  Query: {
    Post: async (_root, args) => {
      const res = extract(
        await Shadow.GetFromDB("Post", objectifyObjectsId(args), 1)
      )

      if(res) {
        let Image = null
        const Author = await Shadow.Resolve(res.Author, "User")
        if(res.Image) {
          Image = await Shadow.Resolve(res.Image, "Image")
        }
        const out = Object.assign(
          {}, res._doc,
          { Author, Image }
        )
        return prepare(out) || null
      }
      return null
    },
    Posts: async (_root, args) => {
      const { Limit } = args
      delete args.Limit
      const res = await Shadow.GetFromDB("Post", args, Limit || Number.MAX_SAFE_INTEGER)
      if(res) {
        const out = []
        for(const post of res) {
          let Image = null
          const Author = await Shadow.Resolve(post.Author, "User")
          if(post.Image) {
            Image = (await Shadow.Resolve(post.Image, "Image"))
          }
          
          out.push(Object.assign(
            {}, post._doc || post,
            { Author, Image: Image ? Image.Img : null }
          ))
        }
        return out.map(prepare)
      }
      return null
    }
  },

  Mutation: {
    postAdd: async (_root, { Author, Content, ImageID }: { Author: string, Content: string, ImageID: string }) => {
      /**
       * Ideas on how to fix the Base64 bug:
       * Use apollo FileUpload mutation
       * Use separate api for sending images and store them in the separate collection
       * Idk...
       */

      const res = await Shadow.AddToDB("Post", {
        Author: mongoose.Types.ObjectId(Author),
        Date: new Date().toDateString(),
        Content,
        Likes: 0,
        Image: ImageID ? mongoose.Types.ObjectId(ImageID) : null,
        Edited: false
      })

      if(res) {
        let image = null
        const author: User | undefined = await Shadow.Resolve(Author as any, "User")
        if(ImageID) {
          image = (await Shadow.Resolve(ImageID as any, "Image"))
        }

        const out = Object.assign({}, res._doc, { 
          Author: author,
          Image: image ? image.Img : null
        })

        return out
      }

      return null
    },
    postUpdate: async (_root, args) => {debugger
      if(!args._id) throw new Error("_id not specified")
      const data = Object.assign({}, args)
      delete data._id
      if(!isNullOrUndefined(data.Many)) delete data.Many
      for(const prop in data) {
        if(isNullOrUndefined(data[prop])) delete data[prop]
      }

      const res = await Shadow.UpdateDB("Post", {_id: args._id}, data, {multi: args.Many})
      return prepare(res)
    },
    postDelete: async (_root, args) => {debugger
      if(isNullOrUndefined(args) || Object.keys(args).length <= 0) {
        throw new Error("No conditions specified in userDelete. Prevented deleting all posts.")
      }
      if(args._id) args._id = mongoose.Types.ObjectId(args._id)
      const { Many } = args
      if(typeof args.Many !== "undefined") delete args.Many

      return await Shadow.DeleteFromDB("Post", args, Many).then((res: any) => res.result)
    }
  }
})