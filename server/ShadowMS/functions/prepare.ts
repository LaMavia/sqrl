// import mongoose from "mongoose"

export default (model: any) => {
  if(!model || !model._doc) throw new Error("")
  return ({
    // @ts-ignore
    ...model._doc,
    _id: String(model._id)
  })
}