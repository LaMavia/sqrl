import iShadow from "../types/basic"
import * as mongoose from "mongoose"

export default class Schema implements iShadow.Schema {
  name: string
  schema: mongoose.Schema
  collection: string
  constructor(
    name: string, 
    schema: mongoose.Schema, 
    collection: string
  ) {
    this.name = name
    this.schema = schema
    this.collection = collection
  }
}