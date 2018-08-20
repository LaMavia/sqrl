import { IsBase64 } from "class-validator";

export class Image {
  @IsBase64() readonly Img: string
  constructor(Img: string) {
    this.Img = Img
  }
}