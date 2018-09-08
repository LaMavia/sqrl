"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class APIRoute {
    constructor(method, path, handler) {
        this.method = method;
        this.path = path;
        this.handler = handler;
    }
}
exports.default = APIRoute;
