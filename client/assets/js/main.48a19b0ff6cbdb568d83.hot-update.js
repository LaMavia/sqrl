webpackHotUpdate("main",{

/***/ "./client/src/store.ts":
/*!*****************************!*\
  !*** ./client/src/store.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst redux_1 = __webpack_require__(/*! redux */ \"./node_modules/redux/es/redux.js\");\r\nconst redux_thunk_1 = __importDefault(__webpack_require__(/*! redux-thunk */ \"./node_modules/redux-thunk/es/index.js\"));\r\nconst post_reducer_1 = __webpack_require__(/*! ./reducers/post.reducer */ \"./client/src/reducers/post.reducer.ts\");\r\nexports.store = redux_1.createStore(redux_1.combineReducers({\r\n    posts: post_reducer_1.postsReducer\r\n}), {\r\n    posts: post_reducer_1.InitialPostsState\r\n}, redux_1.compose(redux_1.applyMiddleware(redux_thunk_1.default), \r\n// @ts-ignore\r\nwindow.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));\r\n\n\n//# sourceURL=webpack:///./client/src/store.ts?");

/***/ })

})