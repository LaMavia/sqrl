webpackHotUpdate("main",{

/***/ "./client/src/App.tsx":
/*!****************************!*\
  !*** ./client/src/App.tsx ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst react_1 = __importDefault(__webpack_require__(/*! react */ \"./node_modules/react/index.js\"));\r\nconst post_actions_1 = __webpack_require__(/*! ./actions/post.actions */ \"./client/src/actions/post.actions.ts\");\r\nconst react_redux_1 = __webpack_require__(/*! react-redux */ \"./node_modules/react-redux/es/index.js\");\r\nclass ConnectedApp extends react_1.default.PureComponent {\r\n    constructor(store) {\r\n        super(store);\r\n    }\r\n    render() {\r\n        debugger;\r\n        const posts = this.props.store.posts;\r\n        return (react_1.default.createElement(\"div\", { className: \"app\" },\r\n            react_1.default.createElement(\"ul\", { className: \"posts\" }, Array.isArray(posts) && posts.map((post) => (react_1.default.createElement(\"li\", { className: \"posts__item\" }, post.Content)))),\r\n            react_1.default.createElement(\"button\", { className: \"app__btn\" }, \"Click me\")));\r\n    }\r\n}\r\nconst mapStateToProps = (state) => ({\r\n    posts: state.posts\r\n});\r\nconst mapDispatchToProps = (dispatch) => ({\r\n    fetchPosts: (n) => dispatch.bind({}, post_actions_1.getPosts({\r\n        conditions: `Limit: ${n}`\r\n    }))\r\n});\r\nexports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(ConnectedApp);\r\n\n\n//# sourceURL=webpack:///./client/src/App.tsx?");

/***/ })

})