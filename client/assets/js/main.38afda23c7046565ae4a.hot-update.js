webpackHotUpdate("main",{

/***/ "./client/src/reducers/nav.reducer.ts":
/*!********************************************!*\
  !*** ./client/src/reducers/nav.reducer.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst nav_action_1 = __webpack_require__(/*! ../actions/nav.action */ \"./client/src/actions/nav.action.ts\");\r\nexports.InitialNavState = {\r\n    sections: {},\r\n    links: [],\r\n    buttons: []\r\n};\r\nfunction navReducer(nav = exports.InitialNavState, action) {\r\n    switch (action.type) {\r\n        case nav_action_1.NAV_SECTION_OPEN: {\r\n            const sc = Object.assign({}, nav.sections);\r\n            for (const sName in sc) {\r\n                sc[sName].open = !!(sName === action.section);\r\n            }\r\n            return {\r\n                sections: sc\r\n            };\r\n        }\r\n        case nav_action_1.NAV_SECTION_CLOSE: {\r\n            const sc = Object.assign({}, nav.sections);\r\n            for (const sName in sc) {\r\n                sc[sName].open = !(sName === action.section);\r\n            }\r\n            return {\r\n                sections: sc\r\n            };\r\n        }\r\n        default: return nav;\r\n    }\r\n}\r\nexports.navReducer = navReducer;\r\n\n\n//# sourceURL=webpack:///./client/src/reducers/nav.reducer.ts?");

/***/ })

})