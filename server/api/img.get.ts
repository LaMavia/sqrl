import APIRoute from '../ShadowMS/classes/APIRoute'
import iShadow from '../ShadowMS/types/basic'
import { extract } from '../ShadowMS/functions/extract';

const path = '/img'
const method = 'GET'
const handler: iShadow.APIHandlerConstruct = (Shadow: iShadow.App) => (
	req,
	res
) => {
  Shadow.GetFromDB("Image", {_id: req.query["id"]}, 1)
    .then(r => extract(r))
    .then(r => {
      if(r && r.Img) return r.Img
      throw new Error(`Image: "${req.query["id"]}" not found`)
    })
    .then((img: string) => {
      const Image = new Buffer(img.split(",")[1], "base64")
      const ex = /data:image\/(.*);base64/.exec(img)
      const type = `image/${ex ? ex[1] : "jpeg"}`
      res.header("Content-Type", type)
      res.send(Image)
    })
    .catch(err => { 
      console.error(err)
      res.status(404).send("")
    })
}

export const ImgGetRoute = new APIRoute(method, path, handler)
