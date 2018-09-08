"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (data, modelName) => data[modelName].map((page) => ({
    Name: page.Name,
    Href: `${data.origin}${page.Href}`
}));
