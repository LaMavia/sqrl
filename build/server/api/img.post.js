"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const APIRoute_1 = __importDefault(require("../ShadowMS/classes/APIRoute"));
const prepare_1 = __importDefault(require("../ShadowMS/functions/prepare"));
const path = '/img';
const method = 'POST';
const handler = (Shadow) => (req, res) => {
    let { Img, Ext } = req.body;
    if (Img && Ext) {
        if (!/data:image\/\w{3,5}.*/.test(Img)) {
            Img = `data:image/${Ext};base64,${Img}`;
        }
        const r = {
            Img: null,
            error: null,
        };
        return Shadow.AddToDB('Image', { Img })
            .then(model => {
            r.Img = prepare_1.default(model);
        })
            .catch(err => {
            r.error = new Error(err);
        })
            .finally(() => {
            if (r.error) {
                res.statusCode = 400;
            }
            res.send(r);
        });
    }
    return res.send({
        Img: null,
        error: new Error('Invalid Image body / No Extension'),
    });
};
exports.ImgPostRoute = new APIRoute_1.default(method, path, handler);
