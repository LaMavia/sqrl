import APIRoute from "../ShadowMS/classes/APIRoute"
import iShadow from "../ShadowMS/types/basic"

const path = "/img"
const method = "POST"
const handler: iShadow.APIHandlerConstruct = (Shadow: iShadow.App) => (
  req, 
  res
  ) => {
	
}

export default new APIRoute(method, path, handler)
