webpackHotUpdate("main",{

/***/ "./client/src/App.tsx":
/*!****************************!*\
  !*** ./client/src/App.tsx ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst react_1 = __importDefault(__webpack_require__(/*! react */ \"./node_modules/react/index.js\"));\r\nconst Nav_1 = __importDefault(__webpack_require__(/*! ./components/Nav */ \"./client/src/components/Nav.tsx\"));\r\nconst react_router_dom_1 = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router-dom/es/index.js\");\r\nconst Home_1 = __importDefault(__webpack_require__(/*! ./routes/Home */ \"./client/src/routes/Home.tsx\"));\r\nclass App extends react_1.default.PureComponent {\r\n    constructor(_props) {\r\n        super(_props);\r\n    }\r\n    render() {\r\n        const supportsHistory = 'pushState' in window.history;\r\n        return (react_1.default.createElement(react_router_dom_1.BrowserRouter, { forceRefresh: !supportsHistory },\r\n            react_1.default.createElement(\"div\", { className: \"app\" },\r\n                react_1.default.createElement(Nav_1.default, null),\r\n                react_1.default.createElement(react_router_dom_1.Switch, null,\r\n                    react_1.default.createElement(react_router_dom_1.Route, { path: \"/\", exact: true, component: Home_1.default })))));\r\n    }\r\n}\r\nexports.default = App;\r\n\n\n//# sourceURL=webpack:///./client/src/App.tsx?");

/***/ }),

/***/ "./client/src/routes/Home.tsx":
/*!************************************!*\
  !*** ./client/src/routes/Home.tsx ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst react_1 = __importDefault(__webpack_require__(/*! react */ \"./node_modules/react/index.js\"));\r\nconst react_router_dom_1 = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router-dom/es/index.js\");\r\nconst react_redux_1 = __webpack_require__(/*! react-redux */ \"./node_modules/react-redux/es/index.js\");\r\nconst connectedHome = ({ user }) => {\r\n    return (react_1.default.createElement(\"main\", { className: \"home\" }, () => {\r\n        if (!user.loggedIn) {\r\n            return react_1.default.createElement(react_router_dom_1.Redirect, { to: \"/login\" });\r\n        }\r\n    }));\r\n};\r\nconst mapStateToProps = (state) => ({\r\n    user: state.user\r\n});\r\nconst mapDispatchToProps = (_dispatch) => ({});\r\nexports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(connectedHome);\r\n\n\n//# sourceURL=webpack:///./client/src/routes/Home.tsx?");

/***/ })

})