import mongoose from "mongoose"
import Model from "../ShadowMS/classes/Model"
import iShadow from "../ShadowMS/types/basic"
import { gql, makeExecutableSchema, addMockFunctionsToSchema } from "apollo-server-express"
import { GraphQLSchema } from "graphql"
import sharedTypes from "./sharedTypes"
import objectifyObjectsId from "../ShadowMS/functions/objectifyObjectsId"
import prepare from "../ShadowMS/functions/prepare"
import { isNullOrUndefined } from 'util'

export const PostDBSchema = new mongoose.Schema({
	Author: mongoose.Schema.Types.ObjectId,
  Date: mongoose.Schema.Types.Date,
  Content: String,
  Likes: Number,
  ImageURL: String,
  Edited: Boolean
})

export const Post = new Model("Post", PostDBSchema, "Posts")

export const PostSchema: GraphQLSchema = makeExecutableSchema({
  typeDefs: gql`
    type Query {
      Post(_id: ID, Author: ID, Date: String, Content: String, Likes: Int, ImageURL: String, Edited: Boolean): Post
      Posts(Author: ID, Date: String, Content: String, Likes: Int, ImageURL: String, Edited: Boolean, Limit: Int): [Post]
      AllPosts: [Post]
    }

    type Mutation {
      postAdd(Author: ID!, Content: String, ImageURL: String): Post
      postUpdate(_id: ID, Author: ID, Date: String, Content: String, Likes: Int, ImageURL: String, Many: Boolean = false): UpdateResult
      postDelete(_id: ID, Author: ID, Date: String, Content: String, Likes: Int, ImageURL: String, Many: Boolean = false): DeleteResult
    }

    ${sharedTypes}

    type Post {
      _id: ID!
      Author: ID!
      Date: String!
      Content: String!
      Likes: Int!
      ImageURL: String
      Edited: Boolean
    }
  `
})
addMockFunctionsToSchema({
  schema: PostSchema
})

export const PostResolver: iShadow.ResolverConstruct<any, any> = Shadow => ({
  Query: {
    Post: async (_root, args) => {
      const res = await Shadow.GetFromDB("Post", objectifyObjectsId(args), 1)
      return prepare(res[0]) || null
    },
    Posts: async (_root, args) => {
      const { Limit } = args
      delete args.Limit
      const res = await Shadow.GetFromDB("Post", args, Limit)
      return res.map(prepare)
    },
    AllPosts: async (_root) => {
      const res = await Shadow.GetFromDB("Post")
      return res.map(prepare)
    }
  },

  Mutation: {
    postAdd: async (_root, { Author, Content, ImageURL }) => {debugger
      const res = await Shadow.AddToDB("Post", {
        Author: mongoose.Types.ObjectId(Author),
        Date: new Date().toDateString(),
        Content,
        Likes: 0,
        ImageURL,
        Edited: false
      })

      return prepare(res)
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