webpackHotUpdate("main",{

/***/ "./client/src/reducers/user.reducer.ts":
/*!*********************************************!*\
  !*** ./client/src/reducers/user.reducer.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar redux_1 = __webpack_require__(/*! redux */ \"./node_modules/redux/es/redux.js\");\r\nvar user_actions_1 = __webpack_require__(/*! ../actions/user.actions */ \"./client/src/actions/user.actions.ts\");\r\nexports.InitialUserState = {\r\n    me: null,\r\n    error: null,\r\n};\r\nfunction errorReducer(error, action) {\r\n    if (error === void 0) { error = null; }\r\n    switch (action.type) {\r\n        case user_actions_1.USER_ERRORED: return action.error;\r\n        default: return error;\r\n    }\r\n}\r\nfunction _userReducer(user, action) {\r\n    if (user === void 0) { user = null; }\r\n    switch (action.type) {\r\n        case user_actions_1.USER_LOADED: return action.user;\r\n        case user_actions_1.USER_UNLOADED: return null;\r\n        default: return user;\r\n    }\r\n}\r\n// @ts-ignore\r\nexports.userReducer = redux_1.combineReducers({\r\n    error: errorReducer,\r\n    me: _userReducer\r\n});\r\n\n\n//# sourceURL=webpack:///./client/src/reducers/user.reducer.ts?");

/***/ })

})