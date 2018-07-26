import mongoose from "mongoose"
import Model from "../ShadowMS/classes/Model"
import iShadow from "../ShadowMS/types/basic"
import { gql, makeExecutableSchema, addMockFunctionsToSchema } from "apollo-server-express"
import { GraphQLSchema } from "graphql"
import hash from "../ShadowMS/functions/hash"
import prepare from "../ShadowMS/functions/prepare"
import { isNullOrUndefined } from "util";
import objectifyObjectsId from "../ShadowMS/functions/objectifyObjectsId"
import sharedTypes from "./sharedTypes"

export const UserDBSchema = new mongoose.Schema({
	Name: String, 
  Username: String,
  Password: String,
  Email: String,
	ProfileImageURL: String,
  BackgroundImageURL: String,
  Followers: [mongoose.Schema.Types.ObjectId]
})

export const User = new Model("User", UserDBSchema, "Users")

export const UserSchema: GraphQLSchema = makeExecutableSchema({
  typeDefs: gql`
    type Query {
      User(_id: ID, Name: String, Username: String, Email: String): User
      Users(_id: ID, Name: String, Username: String, Email: String): [User]
      AllUsers: [User]
    }

    type Mutation {
      userAdd(Name: String!, Username: String!, Password: String!, Email: String!): User
      userUpdate(_id: ID!, Name: String, Username: String, Password: String, Email: String): UpdateResult
      userDelete(_id: ID!, Name: String, Username: String, Password: String, Email: String, Many: Boolean = false): DeleteResult
    }

    ${sharedTypes}

    type User {
      _id: ID
      Name: String!
      Username: String!
      Password: String!
      Email: String!
      ProfileImageURL: String
      BackgroundImageURL: String
      Followers: [ID]
    }
  `
})

addMockFunctionsToSchema({
  schema: UserSchema
})

/*interface UserArguments {
  Name: Name,
  Username: String,
  Password: String,
  Email: String
}*/
export const UserResolver: iShadow.ResolverConstruct<any, any> = Shadow => ({
  Mutation: {
    userAdd: async (_root, { Name, Username, Password, Email }) => {
      return await Shadow.AddToDB("User", {
        Name,
        Username,
        Password: await hash(Password),
        Email,
        ProfileImageURL: "",
        BackgroundImageURL: "",
        Followers: []
      }).catch(err => {
        throw new Error(err)
      })
    },
    userUpdate: async (_root, args) => {
      if(!args._id) throw new Error("_id not specified")
      const data = Object.assign({}, args)
      delete data._id
      for(const prop in data) {
        if(isNullOrUndefined(data[prop])) delete data[prop]
      }
      return await Shadow.UpdateDB("User", {_id: args._id}, data)
    },
    userDelete: async (_root, args) => {
      if(isNullOrUndefined(args) || Object.keys(args).length <= 0) {
        throw new Error("No conditions specified in userDelete. Prevented deleting all users.")
      }
      if(args._id) args._id = mongoose.Types.ObjectId(args._id)
      const { Many } = args
      if(typeof args.Many !== "undefined") delete args.Many
      return await Shadow.DeleteFromDB("User", args, !!Many).then((res: any) => res.result)
    }
  },
  Query: {
    User: async (_root, args) => {
      args = objectifyObjectsId(args)
      const res = await Shadow.GetFromDB("User", args, 1)
      return prepare(res[0]) || null
    },
    Users: async (_root, args) => {
      args = objectifyObjectsId(args)
      const res = await Shadow.GetFromDB("User", args)
      return res.map(prepare)
    },
    AllUsers: async (_root, args) => {
      if(args._id) args._id = mongoose.Types.ObjectId(args._id)
      return await Shadow.GetFromDB("User", args)
    }
  }
})