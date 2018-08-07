webpackHotUpdate("main",{

/***/ "./client/src/actions/user.actions.ts":
/*!********************************************!*\
  !*** ./client/src/actions/user.actions.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst sendQuery_1 = __webpack_require__(/*! ../functions/sendQuery */ \"./client/src/functions/sendQuery.ts\");\r\nexports.USER_LOGGEDIN = \"USER_LOGGEDIN\";\r\nexports.USER_ERRORED = \"USER_ERRORED\";\r\nexports.USER_LOADED = \"USER_LOADED\";\r\nexports.userIsLoading = (yayOrNay) => ({\r\n    type: exports.USER_LOGGEDIN,\r\n    isLoading: yayOrNay\r\n});\r\nexports.userErrored = (error) => ({\r\n    type: exports.USER_ERRORED,\r\n    error\r\n});\r\nexports.userLoaded = (user) => ({\r\n    type: exports.USER_LOADED,\r\n    user\r\n});\r\n// Functions ----------------------------------------------------------------\r\nexports.getUser = (apiURL, conditions) => [apiURL, conditions].some(x => typeof x === \"undefined\")\r\n    // @ts-ignore because of \"this\" binding\r\n    ? exports.getUser.bind(this, ...[apiURL, conditions, limit, skip])\r\n    : (dispatch) => {\r\n        dispatch(exports.userIsLoading(true));\r\n        sendQuery_1.sendQuery(`\r\n\t\t\t\t{\r\n\r\n\t\t\t\t\tUser(${conditions}) {\r\n\t\t\t\t\t\t_id\r\n\t\t\t\t\t\tName\r\n\t\t\t\t\t\tUsername\r\n\t\t\t\t\t\tEmail\r\n\t\t\t\t\t}\r\n\r\n\t\t\t\t}\r\n\t\t\t`, {}, apiURL)\r\n            .then(res => res.json())\r\n            .then(({ data }) => dispatch(exports.userLoaded(data.User)))\r\n            .catch(err => dispatch(exports.userErrored(new Error(err))))\r\n            .finally(() => dispatch(exports.userIsLoading(false)));\r\n    };\r\n\n\n//# sourceURL=webpack:///./client/src/actions/user.actions.ts?");

/***/ })

})