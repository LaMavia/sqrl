import ShadowModel from "../ShadowMS/classes/Model"
import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema({
  Img: String
})

export default new ShadowModel("Image",)