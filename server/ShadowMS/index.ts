import mongoose from "mongoose"
import express, { NextFunction } from "express"
import * as dotenv from "dotenv"
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
	routes: iShadow.Route[]
	APIRoutes: iShadow.APIRoute[]
	CatchHandler: iShadow.CatchHandler
	data: iShadow.LooseObject
	_env: string

	constructor(
		port: number, 
		dbConnection: mongoose.Connection, 
		dbSchemas: iShadow.Schema[], 
		middleware: express.RequestHandler[], 
		routes: iShadow.Route[], 
		APIRoutes: iShadow.APIRoute[],
		CatchHandler: iShadow.CatchHandler
	) {
		this.db = dbConnection
		this.dbSchemas = dbSchemas
		this.dbModels = {}

		this.port = port
		this.middleware = middleware
		this.routes = routes
		this.APIRoutes = APIRoutes
		this.data = {}
		this._env = process.env["NODE_ENV"] || "dev"

		this.CatchHandler = CatchHandler

		this.app = express()

		this.app.on("update", this.UpdateData.bind(this))

		if(this._env === "production") 
			dotenv.config()
		else 
			dotenv.config({path: "../../dev.env"}) 

		this.CreateServer(
			Number(process.env["PORT"]), 
			process.env["HOST"] as string
		)

		this.Init()
	}

	private InitMiddleware() {
		this.middleware.forEach(( mdw: express.RequestHandler ) => {
			this.app.use(mdw)
		})
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
				this.dbModels[schema.name] = 
					this.db.model(schema.name, schema.schema, schema.collection)
			}, this
		)
	}

	private InitErrorHandler() {
		this.app.use((err: any | Error, req: any, res: any, _next: NextFunction) => {
			// set locals, only providing error in development
			res.locals.message = err.message
			res.locals.error = 
				req.app.get("env") === "development" 
					? err 
					: {}
		
			// render the error page
			res.status(err.status || 500)
			res.render("error")
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
	async GetFromDB(modelName: string, conditions: iShadow.LooseObject = {}) {
		let out: any[] = []
		await this.dbModels[modelName].find(conditions)
			.then ( d   => out = d )
			.catch( err => new Error(err) )
		return out
	}

	async UpdateDB(
		modelName: string, 
		query: iShadow.LooseObject, 
		data: iShadow.LooseObject, 
		options: mongoose.ModelUpdateOptions
	) {
		let output: any
		await this.dbModels[modelName].update(query, data, options)
			.then(res => output = res)
			.catch(err => output = err)
		return output
	}

	async DeleteFromDB(
		modelName: string, 
		query: iShadow.LooseObject, 
		single: boolean
	)	{
		let output
		let operation: () => mongoose.Query<any>
		if(single) 
			operation = this.dbModels[modelName].deleteOne.bind(this, query)
		else 			 
			operation = this.dbModels[modelName].deleteMany.bind(this, query)
		await operation()
			.then(res => output = res)
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
			.catch(err => out = err)
		return out
	}

	// Data Methods
	/**
	 * @description Fetches data from data base and saves to ```this.data```
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
				await this.dbModels[modelName].find()
					.then(res => this.data[modelName] = res)
					.catch(this.CatchHandler)
			}
		} 
	}	

}