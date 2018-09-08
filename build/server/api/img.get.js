"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const APIRoute_1 = __importDefault(require("../ShadowMS/classes/APIRoute"));
const extract_1 = require("../ShadowMS/functions/extract");
const path = '/img';
const method = 'GET';
const handler = (Shadow) => (req, res) => {
    Shadow.GetFromDB("Image", { _id: req.query["id"] }, 1)
        .then(r => extract_1.extract(r))
        .then(r => {
        if (r && r.Img)
            return r.Img;
        throw new Error(`Image: "${req.query["id"]}" not found`);
    })
        .then((img) => {
        const Image = new Buffer(img.split(",")[1], "base64");
        const ex = /data:image\/(.*);base64/.exec(img);
        const type = `image/${ex ? ex[1] : "jpeg"}`;
        res.header("Content-Type", type);
        res.send(Image);
    })
        .catch(err => {
        console.error(err);
        res.status(404).send("");
    });
};
exports.ImgGetRoute = new APIRoute_1.default(method, path, handler);
