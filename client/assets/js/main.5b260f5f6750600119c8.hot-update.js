webpackHotUpdate("main",{

/***/ "./client/src/reducers/user.reducer.ts":
/*!*********************************************!*\
  !*** ./client/src/reducers/user.reducer.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst redux_1 = __webpack_require__(/*! redux */ \"./node_modules/redux/es/redux.js\");\r\nconst user_actions_1 = __webpack_require__(/*! ../actions/user.actions */ \"./client/src/actions/user.actions.ts\");\r\nexports.InitialUserState = {\r\n    loggedIn: false,\r\n    me: null,\r\n    error: null,\r\n};\r\nfunction errorReducer(error = null, action) {\r\n    switch (action.type) {\r\n        case user_actions_1.USER_ERRORED: return action.error;\r\n        default: return error;\r\n    }\r\n}\r\nfunction loggedInReducer(isLoggedIn = false, action) {\r\n    switch (action.type) {\r\n        case user_actions_1.USER_LOGIN: return action.isLoggedIn;\r\n        default: return isLoggedIn;\r\n    }\r\n}\r\nfunction _userReducer(user = null, action) {\r\n    switch (action.type) {\r\n        case user_actions_1.USER_LOADED: return action.user;\r\n        default: return user;\r\n    }\r\n}\r\n// @ts-ignore\r\nexports.userReducer = redux_1.combineReducers({\r\n    error: errorReducer,\r\n    loggedIn: loggedInReducer,\r\n    me: _userReducer\r\n});\r\n\n\n//# sourceURL=webpack:///./client/src/reducers/user.reducer.ts?");

/***/ })

})