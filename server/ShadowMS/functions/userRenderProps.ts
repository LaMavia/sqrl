import * as mongoose from "mongoose"
import Models from "../types/models"
export default (id: mongoose.Types.ObjectId, users: Models.User[]) => 
  users.find(user =>
    String(user._id) === String(id)
  )