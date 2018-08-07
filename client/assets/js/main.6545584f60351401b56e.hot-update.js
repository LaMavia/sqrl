webpackHotUpdate("main",{

/***/ "./client/src/reducers/post.reducer.ts":
/*!*********************************************!*\
  !*** ./client/src/reducers/post.reducer.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst redux_1 = __webpack_require__(/*! redux */ \"./node_modules/redux/es/redux.js\");\r\nconst post_actions_1 = __webpack_require__(/*! ../actions/post.actions */ \"./client/src/actions/post.actions.ts\");\r\nfunction errorReducer(error = null, action) {\r\n    switch (action.type) {\r\n        case post_actions_1.POSTS_ERRORED: return action.error;\r\n        default: return error;\r\n    }\r\n}\r\nfunction loadingReducer(areLoading = false, action) {\r\n    switch (action.type) {\r\n        case post_actions_1.POSTS_ARE_LOADING: return action.areLoading;\r\n        default: return areLoading;\r\n    }\r\n}\r\nfunction _postsReducer(posts = [], action) {\r\n    switch (action.type) {\r\n        case post_actions_1.POSTS_LOADED: return [...posts, ...action.posts];\r\n        default: return posts;\r\n    }\r\n}\r\n// @ts-ignore\r\nexports.postsReducer = redux_1.combineReducers({\r\n    error: errorReducer,\r\n    loading: loadingReducer,\r\n    list: _postsReducer\r\n});\r\n\n\n//# sourceURL=webpack:///./client/src/reducers/post.reducer.ts?");

/***/ })

})