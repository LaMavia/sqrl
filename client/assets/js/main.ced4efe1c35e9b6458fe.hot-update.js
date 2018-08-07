webpackHotUpdate("main",{

/***/ "./client/src/App.tsx":
/*!****************************!*\
  !*** ./client/src/App.tsx ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst react_1 = __importDefault(__webpack_require__(/*! react */ \"./node_modules/react/index.js\"));\r\nconst react_redux_1 = __webpack_require__(/*! react-redux */ \"./node_modules/react-redux/es/index.js\");\r\nconst postActions_1 = __webpack_require__(/*! ./actions/postActions */ \"./client/src/actions/postActions.ts\");\r\nclass App extends react_1.default.PureComponent {\r\n    constructor(store) {\r\n        super(store);\r\n        this.store = store;\r\n        debugger;\r\n    }\r\n    render() {\r\n        return (react_1.default.createElement(\"div\", { className: \"app\" },\r\n            react_1.default.createElement(\"ul\", { className: \"posts\" }, Array.isArray(this.store.posts) && this.store.posts.map((post) => (react_1.default.createElement(\"li\", { className: \"posts__item\" }, post.Content)))),\r\n            react_1.default.createElement(\"button\", { onClick: this.store.fetchPosts(2), className: \"app__btn\" }, \"Click me\")));\r\n    }\r\n}\r\nexports.App = App;\r\nconst mapStateToProps = (state) => ({\r\n    posts: state.posts\r\n});\r\nconst mapDispatchToProps = (dispatch) => ({\r\n    fetchPosts: (n) => dispatch.bind(this, postActions_1.getPosts({\r\n        conditions: `Limit: ${n}`\r\n    }))\r\n});\r\nexports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(App);\r\n\n\n//# sourceURL=webpack:///./client/src/App.tsx?");

/***/ })

})