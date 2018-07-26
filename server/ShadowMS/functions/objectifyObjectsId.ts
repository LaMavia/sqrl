import iShadow from "../types/basic"
import mongoose from "mongoose"

export default (o: iShadow.LooseObject) => {
  const ob = Object.assign({}, o)
  if(ob._id) ob._id = mongoose.Types.ObjectId(ob._id)
  return ob
}