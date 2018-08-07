webpackHotUpdate("main",{

/***/ "./client/src/reducers/nav.reducer.ts":
/*!********************************************!*\
  !*** ./client/src/reducers/nav.reducer.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst nav_action_1 = __webpack_require__(/*! ../actions/nav.action */ \"./client/src/actions/nav.action.ts\");\r\nexports.InitialNavState = {\r\n    sections: {\r\n        Menu: {\r\n            icon: \"/svg/menu.svg\",\r\n            items: [\r\n                { name: \"home\", href: \"/\" }\r\n            ],\r\n            open: false\r\n        }\r\n    },\r\n    links: [\r\n        { href: \"/followers\", icon: \"/svg/people.svg\" },\r\n        { href: \"/me\", icon: \"/svg/person.svg\" }\r\n    ],\r\n    modals: [\r\n        {\r\n            name: \"search\",\r\n            icon: \"/svg/search.svg\",\r\n            modal: () => null,\r\n            open: false\r\n        }\r\n    ]\r\n};\r\nfunction navReducer(nav = exports.InitialNavState, action) {\r\n    switch (action.type) {\r\n        case nav_action_1.NAV_SECTION_OPEN: {\r\n            const sc = Object.assign({}, nav.sections);\r\n            for (const sName in sc) {\r\n                sc[sName].open = !!(sName === action.section);\r\n            }\r\n            return Object.assign({}, nav, { sections: sc });\r\n        }\r\n        case nav_action_1.NAV_SECTION_CLOSE: {\r\n            const sc = Object.assign({}, nav.sections);\r\n            sc[action.section].open = false;\r\n            return Object.assign({}, nav, { sections: sc });\r\n        }\r\n        case nav_action_1.NAV_SECTION_SWITCH: {\r\n            const sc = Object.assign({}, nav.sections);\r\n            sc[action.section].open = !sc[action.section].open;\r\n            return Object.assign({}, nav, { sections: sc });\r\n        }\r\n        case nav_action_1.NAV_MODAL_OPEN: {\r\n            const modals = nav.modals\r\n                .map(item => {\r\n                item.open = !!(item.name === action.modal);\r\n                return item;\r\n            });\r\n            return Object.assign({}, nav, { modals });\r\n        }\r\n        case nav_action_1.NAV_MODAL_CLOSE: {\r\n            const modals = nav.modals\r\n                .map(item => {\r\n                item.open = false;\r\n                return item;\r\n            });\r\n            return Object.assign({}, nav, { modals });\r\n        }\r\n        default: return nav;\r\n    }\r\n}\r\nexports.navReducer = navReducer;\r\n\n\n//# sourceURL=webpack:///./client/src/reducers/nav.reducer.ts?");

/***/ })

})