"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (model) => {
    if (!model)
        throw new Error("Inproper model in prepare");
    return (Object.assign({}, (model._doc || model), { _id: String(model._id) }));
};
