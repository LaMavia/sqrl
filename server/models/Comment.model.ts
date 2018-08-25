import mongoose from 'mongoose'
import Model from '../ShadowMS/classes/Model'
import iShadow from '../ShadowMS/types/basic'
import {
	gql,
	makeExecutableSchema,
	addMockFunctionsToSchema,
} from 'apollo-server-express'
import { GraphQLSchema } from 'graphql'
import sharedTypes from './sharedTypes'
import { isNullOrUndefined } from 'util'
import prepare from '../ShadowMS/functions/prepare'
import { extract } from '../ShadowMS/functions/extract'

export interface Comment {
	Author: mongoose.Schema.Types.ObjectId
	Date: String
	Content: String
	Post: mongoose.Schema.Types.ObjectId
}

export const CommentDBSchema = new mongoose.Schema({
	Author: mongoose.Schema.Types.ObjectId,
	Date: String,
	Content: String,
	Post: mongoose.Schema.Types.ObjectId,
})

export const Comment = new Model('Comment', CommentDBSchema, 'Comments')

export const CommentSchema: GraphQLSchema = makeExecutableSchema({
	typeDefs: gql`
		type Query {
			Comment(_id: ID): Comment
			Comments(
				_id: ID
				Author: ID
				Date: String
				Content: String
				Post: ID
			): [Comment]
		}

		type Mutation {
			commentAdd(Author: ID!, Content: String!, Post: ID!): Comment
			commentDelete(
				_id: ID
				Author: ID
				Content: String
				Post: ID
			): DeleteResult
			commentUpdate(_id: ID!, Content: String): UpdateResult
		}

		${sharedTypes}
	`,
})

addMockFunctionsToSchema({ schema: CommentSchema })

export const CommentResolver: iShadow.ResolverConstruct<any, any> = Shadow => ({
	Mutation: {
		commentAdd: async (_root, { Author, Content, Post }) => {
			debugger
			const res = await Shadow.AddToDB('Comment', {
				Author: mongoose.Types.ObjectId(Author),
				Date: new Date().toDateString(),
				Content,
				Post: mongoose.Types.ObjectId(Post),
			})
			if (res) {
				const comment = extract(res)
				const author = await Shadow.GetFromDB('User', {
					_id: String(comment.Author),
				})
				const post = await Shadow.GetFromDB('Post', {
					_id: String(comment.Post),
				})
				Object.assign(comment._doc, {
					Author: extract(author),
					Post: extract(post),
				})

				return res
			}
			return null
		},
		commentDelete: async (_root, args) => {
			debugger
			if (isNullOrUndefined(args) || Object.keys(args).length <= 0) {
				throw new Error(
					'No conditions specified in commentDelete. Prevented deleting all comments.'
				)
			}
			if (args._id) args._id = mongoose.Types.ObjectId(args._id)
			const { Many } = args
			if (typeof args.Many !== 'undefined') delete args.Many
			return await Shadow.DeleteFromDB('Comment', args, !!Many).then(
				(res: any) => res.result
			)
		},
		commentUpdate: async (_root, args) => {
			debugger
			if (!args._id) if (args._id) args._id = mongoose.Types.ObjectId(args._id)
			const data = Object.assign({}, args)
			delete data._id
			for (const prop in data) {
				if (isNullOrUndefined(data[prop])) delete data[prop]
			}
			const res = await Shadow.UpdateDB('Comment', { _id: args._id }, data)
			return res.result
		},
	},
	Query: {
		Comment: async (_root, args): Promise<Comment[]> => {
			if (args._id) args._id = String(args._id)
			const res = await Shadow.GetFromDB('Comment', args, 1)
			const comment = extract(res)
			const author = await Shadow.GetFromDB('User', {
				_id: String(comment.Author),
			})
			const post = await Shadow.GetFromDB('Post', { _id: String(comment.Post) })
			Object.assign(comment._doc, {
				Author: extract(author),
				Post: extract(post),
			})

			return prepare(comment)
		},
		Comments: async (_root, args): Promise<Comment[]> => {
			const res = await Shadow.GetFromDB('Comment', args)
			const out = []
			for (const comment of res) {
				const author = await Shadow.GetFromDB('User', {
					_id: String(comment.Author),
				})
				const post = await Shadow.GetFromDB('Post', {
					_id: String(comment.Post),
				})
				const toOut = Object.assign({}, comment._doc, {
					Author: extract(author),
					Post: extract(post),
				})
				out.push(toOut)
			}
			return out.map(prepare)
		},
	},
})

/*export const _CommentResolver: iShadow.ResolverConstruct<Comment[]> = (Shadow: iShadow.App) => ({
  Comment: async (_root, { _id }): Promise<Comment[]> => {
    return Shadow.GetFromDB("Comment", { _id })
  }
})

export const _CommentMutationResolver: iShadow.ResolverConstruct<Comment> = (Shadow: iShadow.App) => ({
  addComment: async (_root, { Author, Content, Post }) => {
    return await Shadow.AddToDB("Comment", {
      Author,
      Date: new Date().toDateString(),
      Content,
      Post
    })
  }
})*/
