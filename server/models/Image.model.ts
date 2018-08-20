import ShadowModel from "../ShadowMS/classes/Model"
import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema({
  Img: String
})

export const Image = new ShadowModel("Image", ImageSchema, "Images")