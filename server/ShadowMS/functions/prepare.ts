// import mongoose from "mongoose"

export default (model: any) => {
  if(!model) throw new Error("Inproper model in prepare")
  return ({
    // @ts-ignore
    ...(model._doc || model),
    _id: String(model._id)
  })
}