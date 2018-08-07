webpackHotUpdate("main",{

/***/ "./client/src/routes/Home.tsx":
/*!************************************!*\
  !*** ./client/src/routes/Home.tsx ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst react_1 = __importDefault(__webpack_require__(/*! react */ \"./node_modules/react/index.js\"));\r\nconst react_router_dom_1 = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router-dom/es/index.js\");\r\nconst react_redux_1 = __webpack_require__(/*! react-redux */ \"./node_modules/react-redux/es/index.js\");\r\nconst connectedHome = ({ user }) => {\r\n    return !user.loggedIn\r\n        ? react_1.default.createElement(react_router_dom_1.Redirect, { to: \"/login\" })\r\n        : (react_1.default.createElement(\"main\", { className: \"home\" }));\r\n};\r\nconst mapStateToProps = (state) => ({\r\n    user: state.user\r\n});\r\nconst mapDispatchToProps = (_dispatch) => ({});\r\nexports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(connectedHome);\r\n\n\n//# sourceURL=webpack:///./client/src/routes/Home.tsx?");

/***/ })

})