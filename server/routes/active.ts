import Route from "../ShadowMS/classes/Route"
import iShadow from "../ShadowMS/types/basic"
import express from "express"
const router = express.Router()

const handlerConstructor = (Shadow: iShadow.App) =>
	router.get("/", async (req, res, next) => {
    const { id } = req.query
    if(!id) {
      res.redirect("/")
    }
    if(Shadow.data.nonActiveUsers[id]) {
      await Shadow.AddToDB("User", Shadow.data.nonActiveUsers[id])
      delete Shadow.data.nonActiveUsers[id]
      
    } else {
      next(new Error(`Unknown ID: ${id}`))
    }
    
		res.render("active", {
      id
    })
  })
  
export const ActiveRoute = new Route("/active", handlerConstructor)