import * as mongoose from "mongoose"
import * as express from "express"
import Shadow from "../index"
declare namespace iShadow {

  type App = Shadow
  
  interface LooseObject {
    [key: string]: any
  }

  interface Schema {
    name: string
    schema: mongoose.Schema
    collection: string
  }
  
  interface Models<T> {
    [name: string]: mongoose.Model<any | T>
  }

  type HandlerConstruct = (Shadow: App) => express.Router
  interface Route {
    path: string
    handler: HandlerConstruct
  }
  
  type APIHandlerConstruct = (Shadow: App) => express.RequestHandler
  type Method = "GET" | "POST" | "PUT" | "DELETE"
  interface APIRoute {
    method: Method
    path: string | RegExp
    handler: APIHandlerConstruct
  }
  
  interface NavPage {
    Name: string
    Href: string
  }
  
  interface Host {
    address: string
    port: number
    family: string
  }

  type CatchHandler = (( err: any ) => void | any)

}

export default iShadow