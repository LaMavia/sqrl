"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Route {
    constructor(path, handlerConstruct) {
        this.path = path;
        this.handler = handlerConstruct;
    }
}
exports.default = Route;
