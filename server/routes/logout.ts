import Route from "../ShadowMS/classes/Route"
import iShadow from "../ShadowMS/types/basic"
import express from "express"
const router = express.Router()

const handlerConstructor = (_Shadow: iShadow.App) =>
	router.get("*", (_req, res) => {
    res.clearCookie("UserID")
      .redirect("/login")
  })
  
export const LogoutRoute = new Route("/logout", handlerConstructor)