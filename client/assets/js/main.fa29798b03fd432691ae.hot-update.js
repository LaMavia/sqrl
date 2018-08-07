webpackHotUpdate("main",{

/***/ "./client/src/App.tsx":
/*!****************************!*\
  !*** ./client/src/App.tsx ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst react_1 = __importDefault(__webpack_require__(/*! react */ \"./node_modules/react/index.js\"));\r\nconst react_redux_1 = __webpack_require__(/*! react-redux */ \"./node_modules/react-redux/es/index.js\");\r\nconst post_actions_1 = __webpack_require__(/*! ./actions/post.actions */ \"./client/src/actions/post.actions.ts\");\r\nclass ConnectedApp extends react_1.default.PureComponent {\r\n    constructor(_props) {\r\n        super(_props);\r\n    }\r\n    render() {\r\n        return (react_1.default.createElement(\"div\", { className: \"app\" },\r\n            react_1.default.createElement(\"button\", { onClick: this.props.getPosts })));\r\n    }\r\n}\r\nconst mapStateToProps = (state) => ({\r\n    posts: state.posts\r\n});\r\nconst mapDispatchToProps = (_dispatch) => ({\r\n    getPosts: () => post_actions_1.getPosts(`${location.origin}/graphql`, `Limit: 2`)\r\n});\r\nexports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(ConnectedApp);\r\n\n\n//# sourceURL=webpack:///./client/src/App.tsx?");

/***/ })

})