import mongoose from "mongoose"
import bcrypt from "bcrypt"
import Model from "../ShadowMS/classes/Model"
import iShadow from "../ShadowMS/types/basic"
import {
	gql,
	makeExecutableSchema,
	addMockFunctionsToSchema
} from "apollo-server-express"
import { GraphQLSchema } from "graphql"
import hash from "../ShadowMS/functions/hash"
import prepare from "../ShadowMS/functions/prepare"
import { isNullOrUndefined } from "util"
import objectifyObjectsId from "../ShadowMS/functions/objectifyObjectsId"
import sharedTypes from "./sharedTypes"
import { extract } from "../ShadowMS/functions/extract";

export const UserDBSchema = new mongoose.Schema({
	Name: String,
	Username: String,
	Password: String,
	Email: String,
	ProfileImageURL: String,
	BackgroundImageURL: String,
	Followers: [mongoose.Schema.Types.ObjectId],
	LikedPosts: [mongoose.Schema.Types.ObjectId]
})

export const User = new Model("User", UserDBSchema, "Users")

export const UserSchema: GraphQLSchema = makeExecutableSchema({
	typeDefs: gql`
		type Query {
			User(_id: ID, Name: String, Username: String, Email: String): User
			Users(Ids: [ID], _id: ID, Name: String, Username: String, Email: String): [User]
			Login(Username: String!, Password: String!): User
			LoginWithID(_id: ID!): User
		}

		type Mutation {
			userAdd(
				Name: String!
				Username: String!
				Password: String!
				Email: String!
			): User
			userUpdate(
				_id: ID!
				Name: String
				Username: String
				Password: String
        Email: String
        ProfileImageURL: String
			): UpdateResult
			userDelete(
				_id: ID!
				Name: String
				Username: String
				Password: String
				Email: String
				Many: Boolean = false
			): DeleteResult
		}

		${sharedTypes}
	`
})

addMockFunctionsToSchema({
	schema: UserSchema
})


export const UserResolver: iShadow.ResolverConstruct<any, any> = Shadow => ({
	Mutation: {
		userAdd: async (_root, { Name, Username, Password, Email, Activate }) => {
      const isTaken = Shadow.data["User"]
        .some((dUser: any) => dUser.Username === Username || dUser.Email === Email)
			if(isTaken) return null
			const modelProps = {
				Name,
				Username,
				Password: await hash(Password),
				Email,
				ProfileImageURL: "",
				BackgroundImageURL: "",
				Followers: []
			}
			if(Activate) { // Force account activation i.e. Testing
				return await Shadow.AddToDB("User", modelProps)
					.catch(err => {
						throw new Error(err)
					})
			}

			const id = mongoose.Types.ObjectId.createFromTime(new Date().getUTCSeconds())
			Shadow.data.nonActiveUsers[String(id)] = modelProps
			Shadow.SendRegConfirm(modelProps.Email, String(id))
			return true
		},
		userUpdate: async (_root, args) => {
			if (!args._id) throw new Error("_id not specified")
			const data = Object.assign({}, args)
			delete data._id
			for (const prop in data) {
				if (isNullOrUndefined(data[prop])) delete data[prop]
				if (prop === "Password") data[prop] = await hash(data[prop])
      }
      // if(data.ProfileImageURL) {
      //   data.ProfileImageURL = await storeProfileImage(data.ProfileImageURL)
      // }
			return await Shadow.UpdateDB("User", { _id: args._id }, data)
		},
		userDelete: async (_root, args) => {
			if (isNullOrUndefined(args) || Object.keys(args).length <= 0) {
				throw new Error(
					"No conditions specified in userDelete. Prevented deleting all users."
				)
			}
			objectifyObjectsId(args)
			const { Many } = args
			if (typeof args.Many !== "undefined") delete args.Many
			return await Shadow.DeleteFromDB("User", args, !!Many).then(
				(res: any) => res.result
			)
		}
	},
	Query: {
		async User(_root, args) {
			args = objectifyObjectsId(args)
			const res = await Shadow.GetFromDB("User", args, 1)
			if(res) {
				const user = prepare(extract(res))
				let followers = await Shadow.Resolve(user.Followers, "User")

				const out = Object.assign({}, user, { Followers: followers })
				return out || null
			}
			return null
		},
		Users: async (_root, args) => {
			args = objectifyObjectsId(args)
			let res
			if (args.Ids) {
				const argsCopy = Object.assign({}, args)
				delete argsCopy.Ids
				res = []
				for (const _id of args.Ids) {
					const user = extract(await Shadow.GetFromDB("User", { _id, ...argsCopy }, 1))
					const followers = []
					for (const id of user.Followers.map(String)) {
						const follower = prepare(extract(await Shadow.GetFromDB('User', {
							_id: id,
						})))
						followers.push(follower)
					}
					res.push(
						Object.assign({}, user._doc, { Followers: followers })
					)
				}
			} else {
				res = prepare(await Shadow.GetFromDB("User", args))
			}
			
			return res.map(prepare)
		},
		Login: async (_root, {Username, Password}) => {
			const users = await Shadow.GetFromDB("User", { Username })
			if(!users || users.length < 1) return null
			const user = prepare(extract(users))
			const samePassword = await bcrypt.compare(Password, user.Password)

			if(samePassword) {
				const followers = await Shadow.Resolve(user.Followers, "User")

				const out = Object.assign({}, user, { Followers: followers })
				return prepare(out)
			}
			return null
		},
		LoginWithID: async (_root, {_id}) => {
			const users = await Shadow.GetFromDB("User", { _id: String(_id) })
			if(!users || users.length < 1) return null
			const user = prepare(extract(users))

			if (user) {
				const followers = await Shadow.Resolve(user.Followers, "User")
				const out = Object.assign(
					{},
					user,
					{ Followers: followers }
				)
				return prepare(out)
			}
			return null
		}
	}
})
