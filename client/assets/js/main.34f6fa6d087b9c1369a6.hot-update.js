webpackHotUpdate("main",{

/***/ "./client/src/store.ts":
/*!*****************************!*\
  !*** ./client/src/store.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst redux_1 = __webpack_require__(/*! redux */ \"./node_modules/redux/es/redux.js\");\r\nconst redux_thunk_1 = __importDefault(__webpack_require__(/*! redux-thunk */ \"./node_modules/redux-thunk/es/index.js\"));\r\nconst post_reducer_1 = __webpack_require__(/*! ./reducers/post.reducer */ \"./client/src/reducers/post.reducer.ts\");\r\nconst user_reducer_1 = __webpack_require__(/*! ./reducers/user.reducer */ \"./client/src/reducers/user.reducer.ts\");\r\nconst nav_reducer_1 = __webpack_require__(/*! ./reducers/nav.reducer */ \"./client/src/reducers/nav.reducer.ts\");\r\nexports.store = redux_1.createStore(\r\n// @ts-ignore\r\nredux_1.combineReducers({\r\n    posts: post_reducer_1.postsReducer,\r\n    user: user_reducer_1.userReducer,\r\n    nav: nav_reducer_1.navReducer\r\n}), \r\n// @ts-ignore\r\n{\r\n    posts: post_reducer_1.InitialPostsState,\r\n    user: user_reducer_1.InitialUserState,\r\n    nav: nav_reducer_1.InitialNavState\r\n}, redux_1.compose(redux_1.applyMiddleware(redux_thunk_1.default), \r\n// @ts-ignore\r\nwindow.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));\r\n\n\n//# sourceURL=webpack:///./client/src/store.ts?");

/***/ })

})