webpackHotUpdate("main",{

/***/ "./client/src/actions/postActions.ts":
false,

/***/ "./client/src/reducers/post.reducer.ts":
/*!*********************************************!*\
  !*** ./client/src/reducers/post.reducer.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst post_actions_1 = __webpack_require__(/*! ../actions/post.actions */ \"./client/src/actions/post.actions.ts\");\r\nconst sendQuery_1 = __webpack_require__(/*! ../functions/sendQuery */ \"./client/src/functions/sendQuery.ts\");\r\n// @ts-ignore\r\nexports.postReducer = (state, action) => __awaiter(this, void 0, void 0, function* () {\r\n    state = yield state;\r\n    switch (action.type) {\r\n        case post_actions_1.GET_POST: {\r\n            // @ts-ignore\r\n            const { data } = yield sendQuery_1.sendQuery(`\r\n\t\t\t\tquery {\r\n\t\t\t\t\tPost(${action.query.conditions}) {\r\n\t\t\t\t\t\t_id\r\n\t\t\t\t\t\tAuthor\r\n\t\t\t\t\t\tDate\r\n\t\t\t\t\t\tContent\r\n\t\t\t\t\t\tLikes\r\n\t\t\t\t\t\tImageURL\r\n\t\t\t\t\t\tEdited\r\n\t\t\t\t\t}\r\n\t\t\t\t}\r\n\t\t\t`);\r\n            return [...state, data.Post];\r\n        }\r\n        case post_actions_1.GET_POSTS: {\r\n            // @ts-ignore\r\n            const { data } = yield sendQuery_1.sendQuery(`\r\n\t\t\t\tquery {\r\n\t\t\t\t\tPosts(${action.query.conditions}) {\r\n\t\t\t\t\t\t_id\r\n\t\t\t\t\t\tAuthor\r\n\t\t\t\t\t\tDate\r\n\t\t\t\t\t\tContent\r\n\t\t\t\t\t\tLikes\r\n\t\t\t\t\t\tImageURL\r\n\t\t\t\t\t\tEdited\r\n\t\t\t\t\t}\r\n\t\t\t\t}\r\n\t\t\t`);\r\n            debugger;\r\n            return [...state, ...data.Posts];\r\n        }\r\n        default:\r\n            return state;\r\n    }\r\n});\r\n\n\n//# sourceURL=webpack:///./client/src/reducers/post.reducer.ts?");

/***/ })

})