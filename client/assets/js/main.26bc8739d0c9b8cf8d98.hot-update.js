webpackHotUpdate("main",{

/***/ "./client/src/index.tsx":
/*!******************************!*\
  !*** ./client/src/index.tsx ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst react_1 = __importDefault(__webpack_require__(/*! react */ \"./node_modules/react/index.js\"));\r\nconst react_dom_1 = __importDefault(__webpack_require__(/*! react-dom */ \"./node_modules/react-dom/index.js\"));\r\nconst redux_1 = __webpack_require__(/*! redux */ \"./node_modules/redux/es/redux.js\");\r\nconst react_redux_1 = __webpack_require__(/*! react-redux */ \"./node_modules/react-redux/es/index.js\");\r\nconst post_reducer_1 = __webpack_require__(/*! ./reducers/post.reducer */ \"./client/src/reducers/post.reducer.ts\");\r\nconst App_1 = __importDefault(__webpack_require__(/*! ./App */ \"./client/src/App.tsx\"));\r\nconst root = document.getElementById(\"root\");\r\nconst store = redux_1.createStore(redux_1.combineReducers({\r\n    posts: post_reducer_1.postReducer\r\n}), \r\n// @ts-ignore\r\n{\r\n    posts: []\r\n}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());\r\nroot && react_dom_1.default.render((react_1.default.createElement(react_redux_1.Provider, { store: store },\r\n    react_1.default.createElement(App_1.default, null))), root);\r\nif (!root)\r\n    throw new Error(\"Root element not found!\");\r\n\n\n//# sourceURL=webpack:///./client/src/index.tsx?");

/***/ })

})