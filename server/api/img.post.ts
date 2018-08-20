import APIRoute from '../ShadowMS/classes/APIRoute'
import iShadow from '../ShadowMS/types/basic'
import prepare from '../ShadowMS/functions/prepare'
import mongoose from 'mongoose'

const path = '/img'
const method = 'POST'
const handler: iShadow.APIHandlerConstruct = (Shadow: iShadow.App) => (
	req,
	res
) => {
	interface Res {
		Img: mongoose.Document | null
		error: Error | null
  }
  interface Body {
    Img: string
    Ext: string
  }

	let { Img, Ext }: Body = req.body
	if (Img && Ext) {
  if(!/data:image\/\w{3,5}.*/.test(Img)) {
    Img = `data:image/${Ext};base64,${Img}`
  }
		const r: Res = {
			Img: null,
			error: null,
		}
		return Shadow.AddToDB('Image', { Img })
			.then(model => {
				r.Img = prepare(model)
			})
			.catch(err => {
				r.error = new Error(err)
			})
			.finally(() => {
        if(r.error) {
          res.statusCode = 400
        }
        res.send(r)
      })
	}
	return res.send({
		Img: null,
		error: new Error('Invalid Image body / No Extension'),
	})
}

export const ImgPostRoute = new APIRoute(method, path, handler)
