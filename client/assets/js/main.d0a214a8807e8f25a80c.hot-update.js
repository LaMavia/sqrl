webpackHotUpdate("main",{

/***/ "./client/src/actions/user.actions.ts":
/*!********************************************!*\
  !*** ./client/src/actions/user.actions.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar _this = this;\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar sendQuery_1 = __webpack_require__(/*! ../functions/sendQuery */ \"./client/src/functions/sendQuery.ts\");\r\nexports.USER_LOGIN = \"USER_LOGIN\";\r\nexports.USER_LOGGED = \"USER_LOGGED\";\r\nexports.USER_LOADING = \"USER_LOADING\";\r\nexports.USER_ERRORED = \"USER_ERRORED\";\r\nexports.USER_LOADED = \"USER_LOADED\";\r\nexports.USER_UNLOADED = \"USER_UNLOADED\";\r\nexports.userLogin = function (username, password) { return ({\r\n    type: exports.USER_LOGIN,\r\n    data: {\r\n        username: username,\r\n        password: password\r\n    }\r\n}); };\r\nexports.userIsLoading = function (yayOrNay) { return ({\r\n    type: exports.USER_LOADING,\r\n    isLoading: yayOrNay\r\n}); };\r\nexports.userErrored = function (error) { return ({\r\n    type: exports.USER_ERRORED,\r\n    error: error\r\n}); };\r\nexports.userLoaded = function (user) { return ({\r\n    type: exports.USER_LOADED,\r\n    user: user\r\n}); };\r\nexports.userUnloaded = function () { return ({\r\n    type: exports.USER_UNLOADED\r\n}); };\r\n// Functions ----------------------------------------------------------------\r\nexports.getUser = function (apiURL, conditions) {\r\n    return [apiURL, conditions].some(function (x) { return typeof x === \"undefined\"; })\r\n        // @ts-ignore because of \"this\" binding\r\n        ? exports.getUser.bind.apply(exports.getUser, [_this].concat([apiURL, conditions, limit, skip])) : function (dispatch) {\r\n        dispatch(exports.userIsLoading(true));\r\n        sendQuery_1.sendQuery(\"\\n\\t\\t\\t\\t{\\n\\n\\t\\t\\t\\t\\tUser(\" + conditions + \") {\\n\\t\\t\\t\\t\\t\\t_id\\n\\t\\t\\t\\t\\t\\tName\\n\\t\\t\\t\\t\\t\\tUsername\\n\\t\\t\\t\\t\\t\\tEmail\\n\\t\\t\\t\\t\\t}\\n\\n\\t\\t\\t\\t}\\n\\t\\t\\t\", {}, apiURL)\r\n            .then(function (res) { return res.json(); })\r\n            .then(function (_a) {\r\n            var data = _a.data;\r\n            return dispatch(exports.userLoaded(data.User));\r\n        })\r\n            .catch(function (err) { return dispatch(exports.userErrored(new Error(err))); })\r\n            .finally(function () { return dispatch(exports.userIsLoading(false)); });\r\n    };\r\n};\r\nexports.loginUser = function (apiURL, username, password) {\r\n    return [apiURL, username, password].some(function (x) { return typeof x === \"undefined\"; })\r\n        // @ts-ignore because of \"this\" binding\r\n        ? exports.getUser.bind.apply(exports.getUser, [_this].concat([apiURL, conditions, limit, skip])) : function (dispatch) {\r\n        dispatch(exports.userIsLoading(true));\r\n        // Test user: Name: \"test\", Username: \"TestLogin\", Password: \"Test123\", Email: \"Test@mail.com\"\r\n        sendQuery_1.sendQuery(\"\\n\\t\\t\\t{\\n\\t\\t\\t\\tLogin(Username: \\\"\" + username + \"\\\", Password: \\\"\" + password + \"\\\") {\\n\\t\\t\\t\\t\\t_id\\n\\t\\t\\t\\t\\tName\\n\\t\\t\\t\\t\\tUsername\\n\\t\\t\\t\\t\\tEmail\\n\\t\\t\\t\\t\\tProfileImageURL\\n\\t\\t\\t\\t\\tBackgroundImageURL\\n\\t\\t\\t\\t\\tFollowers\\n\\t\\t\\t\\t}\\n\\t\\t\\t}\\n\\t\\t\", {}, apiURL)\r\n            .then(function (res) { return res.json(); })\r\n            .then(function (_a) {\r\n            var data = _a.data;\r\n            dispatch(exports.userLoaded(data.Login));\r\n            return data.Login;\r\n        })\r\n            .then(function (_a) {\r\n            var _id = _a._id;\r\n            var d = new Date();\r\n            d.setTime(d.getTime() + 7 * 24 * 60 * 60 * 1000);\r\n            document.cookie = \"UserID=\" + String(_id) + \"; expires=\" + d.toUTCString();\r\n        })\r\n            .catch(function (err) { return dispatch(exports.userErrored(new Error(err))); })\r\n            .finally(function () { return dispatch(exports.userIsLoading(false)); });\r\n    };\r\n};\r\nexports.logoutUser = function (dispatch) {\r\n    dispatch(exports.userUnloaded());\r\n};\r\n\n\n//# sourceURL=webpack:///./client/src/actions/user.actions.ts?");

/***/ })

})