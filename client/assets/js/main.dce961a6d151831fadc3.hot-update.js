webpackHotUpdate("main",{

/***/ "./client/src/functions/sendQuery.ts":
/*!*******************************************!*\
  !*** ./client/src/functions/sendQuery.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nexports.sendQuery = (query, variables = {}, origin = location.origin) => __awaiter(this, void 0, void 0, function* () {\r\n    let out;\r\n    yield fetch(`${origin}/graphql`, {\r\n        method: \"POST\",\r\n        credentials: \"omit\",\r\n        referrer: `${origin}/graphql`,\r\n        referrerPolicy: \"no-referrer-when-downgrade\",\r\n        headers: {\r\n            \"Content-Type\": \"application/json\",\r\n            Accept: \"application/json\"\r\n        },\r\n        body: JSON.stringify({ query, variables }),\r\n        mode: \"cors\"\r\n    })\r\n        .then(v => v.json())\r\n        .then(v => (out = v))\r\n        .catch(err => console.dir(`Problem fetching ${query}: \"${err}\"`, { colors: true }));\r\n    return out;\r\n});\r\n\n\n//# sourceURL=webpack:///./client/src/functions/sendQuery.ts?");

/***/ }),

/***/ "./client/src/reducers/post.reducer.ts":
/*!*********************************************!*\
  !*** ./client/src/reducers/post.reducer.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst postActions_1 = __webpack_require__(/*! ../actions/postActions */ \"./client/src/actions/postActions.ts\");\r\nconst sendQuery_1 = __webpack_require__(/*! ../functions/sendQuery */ \"./client/src/functions/sendQuery.ts\");\r\n// @ts-ignore\r\nexports.postReducer = (state, action) => __awaiter(this, void 0, void 0, function* () {\r\n    state = yield state;\r\n    switch (action.type) {\r\n        case postActions_1.GET_POST: {\r\n            // @ts-ignore\r\n            const { data } = yield sendQuery_1.sendQuery(`\r\n\t\t\t\tquery {\r\n\t\t\t\t\tPost(${action.query.conditions}) {\r\n\t\t\t\t\t\t_id\r\n\t\t\t\t\t\tAuthor\r\n\t\t\t\t\t\tDate\r\n\t\t\t\t\t\tContent\r\n\t\t\t\t\t\tLikes\r\n\t\t\t\t\t\tImageURL\r\n\t\t\t\t\t\tEdited\r\n\t\t\t\t\t}\r\n\t\t\t\t}\r\n\t\t\t`);\r\n            return [...state, data.Post];\r\n        }\r\n        case postActions_1.GET_POSTS: {\r\n            // @ts-ignore\r\n            const { data } = yield sendQuery_1.sendQuery(`\r\n\t\t\t\tquery {\r\n\t\t\t\t\tPosts(${action.query.conditions}) {\r\n\t\t\t\t\t\t_id\r\n\t\t\t\t\t\tAuthor\r\n\t\t\t\t\t\tDate\r\n\t\t\t\t\t\tContent\r\n\t\t\t\t\t\tLikes\r\n\t\t\t\t\t\tImageURL\r\n\t\t\t\t\t\tEdited\r\n\t\t\t\t\t}\r\n\t\t\t\t}\r\n\t\t\t`);\r\n            debugger;\r\n            return [...state, ...data.Posts];\r\n        }\r\n        default:\r\n            return state;\r\n    }\r\n});\r\n\n\n//# sourceURL=webpack:///./client/src/reducers/post.reducer.ts?");

/***/ }),

/***/ "./client/src/store.ts":
/*!*****************************!*\
  !*** ./client/src/store.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst redux_1 = __webpack_require__(/*! redux */ \"./node_modules/redux/es/redux.js\");\r\nconst post_reducer_1 = __webpack_require__(/*! ./reducers/post.reducer */ \"./client/src/reducers/post.reducer.ts\");\r\nexports.store = redux_1.createStore(redux_1.combineReducers({\r\n    posts: post_reducer_1.postReducer\r\n}), \r\n// @ts-ignore\r\n{\r\n    posts: []\r\n}, \r\n//@ts-ignore\r\nwindow.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());\r\n\n\n//# sourceURL=webpack:///./client/src/store.ts?");

/***/ })

})