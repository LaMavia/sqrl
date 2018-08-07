webpackHotUpdate("main",{

/***/ "./client/src/functions/sendQuery.ts":
/*!*******************************************!*\
  !*** ./client/src/functions/sendQuery.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nexports.sendQuery = (query, variables = {}, origin = location.origin) => __awaiter(this, void 0, void 0, function* () {\r\n    let out = yield fetch(`${origin}/graphql`, {\r\n        method: \"POST\",\r\n        credentials: \"omit\",\r\n        referrer: `${origin}/graphql`,\r\n        referrerPolicy: \"no-referrer-when-downgrade\",\r\n        headers: {\r\n            \"Content-Type\": \"application/json\",\r\n            Accept: \"application/json\"\r\n        },\r\n        body: JSON.stringify({ query, variables }),\r\n        mode: \"cors\"\r\n    })\r\n        .then(v => v.json())\r\n        .then(v => (out = v))\r\n        .catch(err => console.dir(`Problem fetching ${query}: \"${err}\"`, { colors: true }));\r\n    return out;\r\n});\r\n\n\n//# sourceURL=webpack:///./client/src/functions/sendQuery.ts?");

/***/ })

})