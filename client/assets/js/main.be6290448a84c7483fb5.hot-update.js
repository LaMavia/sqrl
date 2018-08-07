webpackHotUpdate("main",{

/***/ "./client/src/App.tsx":
/*!****************************!*\
  !*** ./client/src/App.tsx ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __extends = (this && this.__extends) || (function () {\r\n    var extendStatics = Object.setPrototypeOf ||\r\n        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\r\n        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\r\n    return function (d, b) {\r\n        extendStatics(d, b);\r\n        function __() { this.constructor = d; }\r\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\r\n    };\r\n})();\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar react_1 = __importDefault(__webpack_require__(/*! react */ \"./node_modules/react/index.js\"));\r\nvar Nav_1 = __importDefault(__webpack_require__(/*! ./components/Nav */ \"./client/src/components/Nav.tsx\"));\r\nvar react_router_dom_1 = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router-dom/es/index.js\");\r\nvar react_redux_1 = __webpack_require__(/*! react-redux */ \"./node_modules/react-redux/es/index.js\");\r\nvar Home_1 = __importDefault(__webpack_require__(/*! ./routes/Home */ \"./client/src/routes/Home.tsx\"));\r\nvar Login_1 = __importDefault(__webpack_require__(/*! ./routes/Login */ \"./client/src/routes/Login.tsx\"));\r\nvar getCookies_1 = __webpack_require__(/*! ./functions/getCookies */ \"./client/src/functions/getCookies.ts\");\r\nvar user_actions_1 = __webpack_require__(/*! ./actions/user.actions */ \"./client/src/actions/user.actions.ts\");\r\nvar App = /** @class */ (function (_super) {\r\n    __extends(App, _super);\r\n    function App(props) {\r\n        return _super.call(this, props) || this;\r\n    }\r\n    App.prototype.render = function () {\r\n        var supportsHistory = 'pushState' in window.history;\r\n        var _id = getCookies_1.getCookies().UserID;\r\n        if (_id) {\r\n            this.props.loginWithID(_id);\r\n        }\r\n        return (react_1.default.createElement(react_router_dom_1.BrowserRouter, { forceRefresh: !supportsHistory },\r\n            react_1.default.createElement(\"div\", { className: \"app\" },\r\n                react_1.default.createElement(Nav_1.default, null),\r\n                react_1.default.createElement(react_router_dom_1.Switch, null,\r\n                    react_1.default.createElement(react_router_dom_1.Route, { path: \"/\", exact: true, component: Home_1.default }),\r\n                    react_1.default.createElement(react_router_dom_1.Route, { path: \"/login\", component: Login_1.default })))));\r\n    };\r\n    return App;\r\n}(react_1.default.PureComponent));\r\nvar mstp = function (state) { return ({\r\n    user: state.user.me\r\n}); };\r\nvar mdtp = function (dispatch) { return ({\r\n    loginWithID: function (_id) { return dispatch(user_actions_1.loginWIthID(location.origin + \"/graphql\", _id)); }\r\n}); };\r\nexports.default = react_redux_1.connect(mstp, mdtp)(App);\r\n\n\n//# sourceURL=webpack:///./client/src/App.tsx?");

/***/ }),

/***/ "./client/src/functions/getCookies.ts":
/*!********************************************!*\
  !*** ./client/src/functions/getCookies.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nexports.getCookies = function () {\r\n    return document.cookie\r\n        .split(\";\")\r\n        .reduce(function (acc, c) {\r\n        var _a;\r\n        var sc = c.split(\"=\");\r\n        return Object.assign(acc, (_a = {},\r\n            _a[sc[0]] = sc[1],\r\n            _a));\r\n    }, {});\r\n};\r\n\n\n//# sourceURL=webpack:///./client/src/functions/getCookies.ts?");

/***/ })

})