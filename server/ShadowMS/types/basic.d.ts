import * as mongoose from "mongoose"
import * as express from "express"
import { IResolverObject } from "apollo-server-express"
import { GraphQLResolveInfo, GraphQLFieldConfigArgumentMap } from "graphql"

import Shadow from ".."
declare namespace iShadow {

  export type App = Shadow
  
  export interface LooseObject {
    [key: string]: any
  }

  export interface Schema {
    name: string
    schema: mongoose.Schema
    collection: string
  }
  
  export interface Models<T> {
    [name: string]: mongoose.Model<any | T>
  }

  export type HandlerConstruct = (Shadow: App) => express.Router
  interface Route {
    path: string
    handler: HandlerConstruct
  }

  interface ResolverInterface<ReturnType, ArgumentsInterface = LooseObject> {
    Mutation: Resolver<ReturnType, ArgumentsInterface>,
    Query: Resolver<ReturnType, ArgumentsInterface>
  }

  export interface Resolver<ReturnType, ArgumentsInterface = LooseObject> {
    [type: string]: (
      parent: any, 
      args: ArgumentsInterface, 
      context: LooseObject, 
      info: GraphQLResolveInfo
    ) => (null | undefined) | Array<ReturnType> | Promise<ReturnType> | ReturnType
  }
  export type ResolverConstruct<ReturnType, ArgumentsInterface = LooseObject> = (Shadow: App) => ResolverInterface<ReturnType, ArgumentsInterface>

  export type APIHandlerConstruct = (Shadow: App) => express.RequestHandler
  export type Method = "GET" | "POST" | "PUT" | "DELETE"
  export interface APIRoute {
    method: Method
    path: string | RegExp
    handler: APIHandlerConstruct
  }
  
  export interface NavPage {
    Name: string
    Href: string
  }
  
  export interface Host {
    address: string
    port: number
    family: string
  }

  export type CatchHandler = (( err: any ) => void | any)

}

export default iShadow