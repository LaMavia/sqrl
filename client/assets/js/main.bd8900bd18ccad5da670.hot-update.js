webpackHotUpdate("main",{

/***/ "./client/src/App.tsx":
/*!****************************!*\
  !*** ./client/src/App.tsx ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst react_1 = __importDefault(__webpack_require__(/*! react */ \"./node_modules/react/index.js\"));\r\nconst react_redux_1 = __webpack_require__(/*! react-redux */ \"./node_modules/react-redux/es/index.js\");\r\nconst post_actions_1 = __webpack_require__(/*! ./actions/post.actions */ \"./client/src/actions/post.actions.ts\");\r\nclass App extends react_1.default.PureComponent {\r\n    constructor(store) {\r\n        super(store);\r\n        this.store = store;\r\n        debugger;\r\n    }\r\n    render() {\r\n        const posts = this.store.getState().posts;\r\n        return (react_1.default.createElement(\"div\", { className: \"app\" },\r\n            react_1.default.createElement(\"ul\", { className: \"posts\" }, Array.isArray(posts) && posts.map((post) => (react_1.default.createElement(\"li\", { className: \"posts__item\" }, post.Content)))),\r\n            react_1.default.createElement(\"button\", { onClick: this.store.fetchPosts(2), className: \"app__btn\" }, \"Click me\")));\r\n    }\r\n}\r\nexports.App = App;\r\nconst mapStateToProps = (state) => ({\r\n    posts: state.posts\r\n});\r\nconst mapDispatchToProps = (dispatch) => ({\r\n    fetchPosts: (n) => dispatch.bind(this, post_actions_1.getPosts({\r\n        conditions: `Limit: ${n}`\r\n    }))\r\n});\r\n// @ts-ignore\r\nexports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(App);\r\n\n\n//# sourceURL=webpack:///./client/src/App.tsx?");

/***/ }),

/***/ "./client/src/actions/post.actions.ts":
/*!********************************************!*\
  !*** ./client/src/actions/post.actions.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nexports.GET_POST = \"post:GET_POST\";\r\nexports.ADD_POST = \"post:ADD_POST\";\r\nexports.DEL_POST = \"post:DEL_POST\";\r\nexports.GET_POSTS = \"post:GET_POSTS\";\r\nexports.getPost = (query) => ({\r\n    type: exports.GET_POST,\r\n    query\r\n});\r\nexports.addPost = (query) => ({\r\n    type: exports.ADD_POST,\r\n    query\r\n});\r\nexports.delPost = (query) => ({\r\n    type: exports.DEL_POST,\r\n    query\r\n});\r\nexports.getPosts = (query) => ({\r\n    type: exports.GET_POSTS,\r\n    query\r\n});\r\n\n\n//# sourceURL=webpack:///./client/src/actions/post.actions.ts?");

/***/ })

})