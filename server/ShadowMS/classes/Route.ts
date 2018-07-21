import Shadow from "../types/basic"
import iShadow from "../types/basic";

export default class Route implements Shadow.Route {
  path: string
  handler: iShadow.HandlerConstruct
  constructor(path: string, handlerConstruct: iShadow.HandlerConstruct) {
    this.path = path
    this.handler = handlerConstruct
  }
}