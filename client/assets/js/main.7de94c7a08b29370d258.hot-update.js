webpackHotUpdate("main",{

/***/ "./client/src/routes/Home.tsx":
/*!************************************!*\
  !*** ./client/src/routes/Home.tsx ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar react_1 = __importDefault(__webpack_require__(/*! react */ \"./node_modules/react/index.js\"));\r\nvar user_actions_1 = __webpack_require__(/*! ../actions/user.actions */ \"./client/src/actions/user.actions.ts\");\r\nvar react_router_dom_1 = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router-dom/es/index.js\");\r\nvar react_redux_1 = __webpack_require__(/*! react-redux */ \"./node_modules/react-redux/es/index.js\");\r\nvar connectedHome = function (_a) {\r\n    var user = _a.user, login = _a.login;\r\n    var cookies = document.cookie\r\n        .split(\";\")\r\n        .filter(Boolean)\r\n        .map(function (x) { return x.split(\"=\"); })\r\n        .reduce(function (acc, c) {\r\n        var _a;\r\n        return Object.assign(acc, (_a = {}, _a[c[0]] = c[1] || \"\", _a));\r\n    }, {});\r\n    return !user.me\r\n        ? react_1.default.createElement(react_router_dom_1.Redirect, { to: \"/login\" })\r\n        : (react_1.default.createElement(\"main\", { className: \"home\" }));\r\n};\r\nvar mapStateToProps = function (state) { return ({\r\n    user: state.user\r\n}); };\r\nvar mapDispatchToProps = function (dispatch) { return ({\r\n    login: function (id) {\r\n        dispatch(user_actions_1.getUser(location.origin + \"/graphql\", \"_id: \\\"\" + id + \"\\\"\")(dispatch));\r\n    }\r\n}); };\r\nexports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(connectedHome);\r\n\n\n//# sourceURL=webpack:///./client/src/routes/Home.tsx?");

/***/ })

})