webpackHotUpdate("main",{

/***/ "./client/src/store.ts":
/*!*****************************!*\
  !*** ./client/src/store.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst redux_1 = __webpack_require__(/*! redux */ \"./node_modules/redux/es/redux.js\");\r\nconst post_reducer_1 = __webpack_require__(/*! ./reducers/post.reducer */ \"./client/src/reducers/post.reducer.ts\");\r\nexports.store = redux_1.createStore(redux_1.combineReducers({\r\n    posts: post_reducer_1.postsReducer\r\n}), \r\n// @ts-ignore\r\n{\r\n    posts: []\r\n}, \r\n//@ts-ignore\r\nwindow.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());\r\n\n\n//# sourceURL=webpack:///./client/src/store.ts?");

/***/ })

})