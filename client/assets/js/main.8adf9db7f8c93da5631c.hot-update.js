webpackHotUpdate("main",{

/***/ "./client/src/functions/sendQuery.ts":
false,

/***/ "./client/src/reducers/post.reducer.ts":
/*!*********************************************!*\
  !*** ./client/src/reducers/post.reducer.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst redux_1 = __webpack_require__(/*! redux */ \"./node_modules/redux/es/redux.js\");\r\nconst post_actions_1 = __webpack_require__(/*! ../actions/post.actions */ \"./client/src/actions/post.actions.ts\");\r\nfunction errorReducer(error = null, action) {\r\n    switch (action.type) {\r\n        case post_actions_1.POSTS_ERRORED: return action.error;\r\n    }\r\n}\r\nexports.postsReducer = redux_1.combineReducers({\r\n    error\r\n});\r\n\n\n//# sourceURL=webpack:///./client/src/reducers/post.reducer.ts?");

/***/ })

})