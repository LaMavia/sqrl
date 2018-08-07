webpackHotUpdate("main",{

/***/ "./client/src/actions/user.actions.ts":
/*!********************************************!*\
  !*** ./client/src/actions/user.actions.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst sendQuery_1 = __webpack_require__(/*! ../functions/sendQuery */ \"./client/src/functions/sendQuery.ts\");\r\nexports.USER_LOGIN = \"USER_LOGIN\";\r\nexports.USER_ERRORED = \"USER_ERRORED\";\r\nexports.USER_LOADED = \"USER_LOADED\";\r\nexports.userIsLoading = (yayOrNay) => ({\r\n    type: exports.USER_LOGIN,\r\n    isLoading: yayOrNay\r\n});\r\nexports.userErrored = (error) => ({\r\n    type: exports.USER_ERRORED,\r\n    error\r\n});\r\nexports.userLoaded = (user) => ({\r\n    type: exports.USER_LOADED,\r\n    user\r\n});\r\n// Functions ----------------------------------------------------------------\r\nexports.getUser = (apiURL, conditions) => [apiURL, conditions].some(x => typeof x === \"undefined\")\r\n    // @ts-ignore because of \"this\" binding\r\n    ? exports.getUser.bind(this, ...[apiURL, conditions, limit, skip])\r\n    : (dispatch) => {\r\n        dispatch(exports.userIsLoading(true));\r\n        sendQuery_1.sendQuery(`\r\n\t\t\t\t{\r\n\r\n\t\t\t\t\tUser(${conditions}) {\r\n\t\t\t\t\t\t_id\r\n\t\t\t\t\t\tName\r\n\t\t\t\t\t\tUsername\r\n\t\t\t\t\t\tEmail\r\n\t\t\t\t\t}\r\n\r\n\t\t\t\t}\r\n\t\t\t`, {}, apiURL)\r\n            .then(res => res.json())\r\n            .then(({ data }) => dispatch(exports.userLoaded(data.User)))\r\n            .catch(err => dispatch(exports.userErrored(new Error(err))))\r\n            .finally(() => dispatch(exports.userIsLoading(false)));\r\n    };\r\n\n\n//# sourceURL=webpack:///./client/src/actions/user.actions.ts?");

/***/ }),

/***/ "./client/src/reducers/user.reducer.ts":
/*!*********************************************!*\
  !*** ./client/src/reducers/user.reducer.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst redux_1 = __webpack_require__(/*! redux */ \"./node_modules/redux/es/redux.js\");\r\nconst user_actions_1 = __webpack_require__(/*! ../actions/user.actions */ \"./client/src/actions/user.actions.ts\");\r\nexports.InitialUserState = {\r\n    loggedIn: false,\r\n    me: null,\r\n    error: null,\r\n};\r\nfunction errorReducer(error = null, action) {\r\n    switch (action.type) {\r\n        case user_actions_1.USER_ERRORED: return action.error;\r\n        default: return error;\r\n    }\r\n}\r\nfunction loggedInReducer(isLoggedIn, action) {\r\n    switch (action.type) {\r\n        case user_actions_1.USER_LOGIN: return action.isLoggedIn;\r\n        default: isLoggedIn;\r\n    }\r\n}\r\nfunction _userReducer(user, action) {\r\n    switch (action.type) {\r\n        case user_actions_1.USER_LOADED: return action.user;\r\n        default: return user;\r\n    }\r\n}\r\n// @ts-ignore\r\nexports.userReducer = redux_1.combineReducers({\r\n    error: errorReducer,\r\n    loggedIn: loggedInReducer,\r\n    me: _userReducer\r\n});\r\n\n\n//# sourceURL=webpack:///./client/src/reducers/user.reducer.ts?");

/***/ }),

/***/ "./client/src/store.ts":
/*!*****************************!*\
  !*** ./client/src/store.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst redux_1 = __webpack_require__(/*! redux */ \"./node_modules/redux/es/redux.js\");\r\nconst redux_thunk_1 = __importDefault(__webpack_require__(/*! redux-thunk */ \"./node_modules/redux-thunk/es/index.js\"));\r\nconst post_reducer_1 = __webpack_require__(/*! ./reducers/post.reducer */ \"./client/src/reducers/post.reducer.ts\");\r\nconst user_reducer_1 = __webpack_require__(/*! ./reducers/user.reducer */ \"./client/src/reducers/user.reducer.ts\");\r\n// @ts-ignore\r\nexports.store = redux_1.createStore(redux_1.combineReducers({\r\n    posts: post_reducer_1.postsReducer,\r\n    user: user_reducer_1.userReducer\r\n}), {\r\n    posts: post_reducer_1.InitialPostsState,\r\n    user: user_reducer_1.InitialUserState\r\n}, redux_1.compose(redux_1.applyMiddleware(redux_thunk_1.default), \r\n// @ts-ignore\r\nwindow.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));\r\n\n\n//# sourceURL=webpack:///./client/src/store.ts?");

/***/ })

})