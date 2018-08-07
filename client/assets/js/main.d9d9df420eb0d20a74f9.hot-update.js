webpackHotUpdate("main",{

/***/ "./client/src/actions/nav.action.ts":
/*!******************************************!*\
  !*** ./client/src/actions/nav.action.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nexports.NAV_SECTION_OPEN = \"NAV_SECTION_OPEN\";\r\nexports.NAV_SECTION_CLOSE = \"NAV_SECTION_CLOSE\";\r\nexports.navSectionOpen = (section) => ({\r\n    type: exports.NAV_SECTION_OPEN,\r\n    section\r\n});\r\nexports.navSectionClose = (section) => ({\r\n    type: exports.NAV_SECTION_CLOSE,\r\n    section\r\n});\r\n// Functions -------------------------------------------------------\r\nexports.openNavSection = (section) => (dispatch) => {\r\n    dispatch(exports.navSectionOpen(section));\r\n};\r\nexports.closeNavSection = (section) => (dispatch) => {\r\n    dispatch(exports.navSectionClose(section));\r\n};\r\n\n\n//# sourceURL=webpack:///./client/src/actions/nav.action.ts?");

/***/ }),

/***/ "./client/src/reducers/nav.reducer.ts":
/*!********************************************!*\
  !*** ./client/src/reducers/nav.reducer.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst nav_action_1 = __webpack_require__(/*! ../actions/nav.action */ \"./client/src/actions/nav.action.ts\");\r\nexports.InitialNavState = {\r\n    sections: {}\r\n};\r\nfunction navReducer(nav = exports.InitialNavState, action) {\r\n    switch (action.type) {\r\n        case nav_action_1.NAV_SECTION_OPEN: {\r\n            const sc = Object.assign({}, nav.sections);\r\n            for (const sName in sc) {\r\n                sc[sName].open = !!(sName === action.section);\r\n            }\r\n            return {\r\n                sections: sc\r\n            };\r\n        }\r\n        case nav_action_1.NAV_SECTION_CLOSE: {\r\n            const sc = Object.assign({}, nav.sections);\r\n            for (const sName in sc) {\r\n                sc[sName].open = !(sName === action.section);\r\n            }\r\n            return {\r\n                sections: sc\r\n            };\r\n        }\r\n        default: return nav;\r\n    }\r\n}\r\nexports.navReducer = navReducer;\r\n\n\n//# sourceURL=webpack:///./client/src/reducers/nav.reducer.ts?");

/***/ }),

/***/ "./client/src/store.ts":
/*!*****************************!*\
  !*** ./client/src/store.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst redux_1 = __webpack_require__(/*! redux */ \"./node_modules/redux/es/redux.js\");\r\nconst redux_thunk_1 = __importDefault(__webpack_require__(/*! redux-thunk */ \"./node_modules/redux-thunk/es/index.js\"));\r\nconst post_reducer_1 = __webpack_require__(/*! ./reducers/post.reducer */ \"./client/src/reducers/post.reducer.ts\");\r\nconst user_reducer_1 = __webpack_require__(/*! ./reducers/user.reducer */ \"./client/src/reducers/user.reducer.ts\");\r\nconst nav_reducer_1 = __webpack_require__(/*! ./reducers/nav.reducer */ \"./client/src/reducers/nav.reducer.ts\");\r\n// @ts-ignore\r\nexports.store = redux_1.createStore(redux_1.combineReducers({\r\n    posts: post_reducer_1.postsReducer,\r\n    user: user_reducer_1.userReducer,\r\n    nav: nav_reducer_1.navReducer\r\n}), {\r\n    posts: post_reducer_1.InitialPostsState,\r\n    user: user_reducer_1.InitialUserState\r\n}, redux_1.compose(redux_1.applyMiddleware(redux_thunk_1.default), \r\n// @ts-ignore\r\nwindow.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));\r\n\n\n//# sourceURL=webpack:///./client/src/store.ts?");

/***/ })

})