import mongoose from "mongoose"
import express, { NextFunction } from "express"
import { ApolloServer, mergeSchemas } from "apollo-server-express"
import { GraphQLSchema } from "graphql"
// import { makeExecutableSchema } from "graphql-tools"
import * as path from "path"

import iShadow from "./types/basic" 
/**
 * @todo Add CMS routes \w handlers
*/

export default class Shadow {
	
	port: number
	db: mongoose.Connection
	dbSchemas: iShadow.Schema[]
	dbModels: iShadow.Models<any>
	middleware: express.RequestHandler[]
	app: express.Express
	apollo: ApolloServer
	routes: iShadow.Route[]
	APIRoutes: iShadow.APIRoute[]
	CatchHandler: iShadow.CatchHandler
	data: iShadow.LooseObject
	_env: string

	constructor(
		dbConnection: mongoose.Connection, 
		dbSchemas: iShadow.Schema[], 
		middleware: express.RequestHandler[], 
		routes: iShadow.Route[], 
		APIRoutes: iShadow.APIRoute[],
		CatchHandler: iShadow.CatchHandler,
		graphqlSchemas: GraphQLSchema[],
		graphqlResolvers: iShadow.ResolverConstruct<any, any>[]
	) {
		this.db = dbConnection
		this.dbSchemas = dbSchemas
		this.dbModels = {}

		this.port = Number(process.env["PORT"])
		this.middleware = middleware
		this.routes = routes
		this.APIRoutes = APIRoutes
		this.data = {}
		this._env = process.env["NODE_ENV"] || "dev"

		this.CatchHandler = CatchHandler

		this.app = express()
		this.apollo = this.InitApollo(graphqlSchemas, graphqlResolvers)

		this.app.on("update", this.UpdateData.bind(this))

		this.CreateServer(
			this.port, 
			process.env["HOST"] as string
		)

		this.Init()
	}

	private InitApollo(graphqlSchemas: GraphQLSchema[], graphqlResolvers: iShadow.ResolverConstruct<any, any>[]) {
		// @ts-ignore
		const schema: GraphQLSchema = mergeSchemas({
			schemas: graphqlSchemas,
			resolvers: graphqlResolvers
				.map(constr => constr(this))
				.reduce((acc, x) => ({
					Mutation: Object.assign({}, acc.Mutation, x.Mutation),
					Query: Object.assign({}, acc.Query, x.Query)
				}), {Query: {}, Mutation: {}})
		})

		const apollo = new ApolloServer({
			schema
		})
		apollo.applyMiddleware({ app: this.app })
		return apollo
	}

	private InitMiddleware() {
		this.middleware.forEach(mdlw => this.app.use(mdlw))
		/*
		function* gen(middleware: RequestHandler[]): IterableIterator<RequestHandler> {
			for(const mdw of middleware) {
				yield mdw
			}
		}

		for (const mdw of gen(this.middleware)) {
			this.app.use(mdw)
		}
		*/

	}

	private InitRoutes() {
		this.routes.forEach(( route: iShadow.Route ) => {
			const passedData = this // Object.freeze(Object.assign({}, this))
			this.app.use(route.path, route.handler(passedData))
		})
	}

	private InitAPI() {
		this.APIRoutes.forEach((route: iShadow.APIRoute) => {
			const handler = route.handler(this)
			switch(route.method) {
				case "GET"   : this.app.get   (route.path, handler);break;
				case "POST"  : this.app.post  (route.path, handler);break;
				case "PUT"   : this.app.put   (route.path, handler);break;
				case "DELETE": this.app.delete(route.path, handler);break;
				default:/* [*] */;break;
			}
		}, this)
	}
 
	private InitModels() {
		this.dbSchemas.forEach(
			(schema: iShadow.Schema) => {
				const newModel = this.db.model(schema.name, schema.schema, schema.collection)

				this.dbModels[schema.name] = newModel
				/*new Proxy(newModel, {
					get(target, propKey, _receiver) {
						if(target && propKey !== "Query") {
							// @ts-ignore
							const calledMethod = target[propKey]
							return !(String(propKey) && /find/g.test(String(propKey)) && target)
								? calledMethod
								: (...args: any[]) => {
									// console.dir(args, { colors: true })
									const res = calledMethod.call(target, ...args)
									debugger
									return res
								}
						}
						return () => {}
					}
				})*/
			}, this
		)
	}

	private InitErrorHandler() {
		this.app.use((err: any | Error, _req: any, res: any, _next: NextFunction) => {
			if(!res.headersSent){
				res.status(500)
				res.render('error', { error: err })
			}
		})
	}

	private CreateServer(port: number, host: string) {
		this.app.listen(port, () => {
			console.info('\x1b[32m%s\x1b[0m', ` Listening at ${host}:${port}`)
		})
	}

	private Init() {
		this.app.set("views", path.join(__dirname, "..","views"))
		this.app.set("view engine", "pug")
		
		this.data.origin = this._env === "production"
			? process.env["HOST"]
			:`${process.env["HOST"]}${process.env["PORT"] 
			? `:${process.env["PORT"]}`
			: ""
		}`
		this.data.sharedMethods = {
			GetFromDB: this.GetFromDB.bind(this)
		}

		this.InitMiddleware()
		this.InitAPI()
		this.InitModels()
		this.UpdateData()

		this.InitRoutes()
		this.InitErrorHandler()
		console.info("\x1b[36m%s\x1b[0m"," Ready for Action 👊")
		
	}

	// DataBase Methods
	async GetFromDB(modelName: string, conditions: iShadow.LooseObject = {}, limit = Number.MAX_SAFE_INTEGER) {
		let out: any[] = []
		await this.dbModels[modelName].find(conditions).limit(limit)
			.then( d => out = d )
			/**
			 * @description Caching responses from the Database in their corresponding this.data[ModelName]
			 */
			.then( res => {	
				if(Array.isArray(res)) {
					for(const item of res) {
						if(this.data[modelName].some((x: any) => String(x._id) === item._id)) {
							this.data[modelName].push(item)
						}
					}
				} else if(res) {
					if(this.data[modelName].some((x: any) => String(x._id) === (res as any)._id)) {
						this.data[modelName].push(res)
					}
				}
			})
			.catch( err => new Error(err) )
		return out
	}

	async AddToDB<ModelSchema>(
		modelName: string,
		modelArguments: ModelSchema
	) {
		const model = this.dbModels[modelName]
		if (!model) {
			throw new Error(`Model: ${modelName} not found!`)
		}
		const response = await model.create(modelArguments)
			.then(doc => {
				// this.app.emit("update", modelName)
				this.data[modelName].push(doc)
				return doc
			})
			.catch(err => {throw new Error(err)})

		return response
	}

	async UpdateDB(
		modelName: string, 
		query: iShadow.LooseObject, 
		data: iShadow.LooseObject, 
		options: mongoose.ModelUpdateOptions = {}
	) {
		let output: any
		await this.dbModels[modelName].update(query, data, options)
			.then(res => output = res)
			.then(_ => this.app.emit("update", modelName))
			.catch(err => output = err)
		return output
	}

	async DeleteFromDB(
		modelName: string, 
		query: iShadow.LooseObject, 
		single: boolean
	)	{
		let output
		const collection = this.dbModels[modelName] && this.dbModels[modelName].collection
		if(!collection) throw new Error(`Collection ${collection} not found`)

		await collection.remove(query, {
				single
			})
			.then(res => output = res)
			.then(_ => this.app.emit("update", modelName))
			.catch(err => output = err)
		return output
	}

	async AddProp<T>(modelName: string, propName: string, value: T) {
		let out: any
		await this.dbModels[modelName]
			.update(
				{}, 
				{ [propName]: value },
				{ multi: true, overwrite: false }
			)
			.then(res => out = res)
			.then(_ => this.app.emit("update", modelName))
			.catch(err => out = err)
		return out
	}

	// Data Methods
	/**
	 * @description Fetches data from the database and saves to ```this.data```
	 * @returns void
	 */
	async UpdateData(...modelNames: string[]) {
		if(modelNames.length > 0) {
			await	modelNames.forEach(async (modelName: string) => {
				await this.dbModels[modelName].find()
					.then(res => this.data[modelName] = res)
					.catch(this.CatchHandler)
			}, this)
		} else { // Updates everything
			for(const modelName in this.dbModels) {
				try {
					await this.dbModels[modelName].find()
					.then(res => this.data[modelName] = res)
					.catch(this.CatchHandler)
				} catch(err) {
					console.error(new Error(err))
				}
			}
		} 
	}	

}