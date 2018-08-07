webpackHotUpdate("main",{

/***/ "./client/src/actions/nav.action.ts":
/*!******************************************!*\
  !*** ./client/src/actions/nav.action.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nexports.NAV_SECTION_OPEN = \"NAV_SECTION_OPEN\";\r\nexports.NAV_SECTION_CLOSE = \"NAV_SECTION_CLOSE\";\r\nexports.NAV_MODAL_OPEN = \"NAV_MODAL_OPEN\";\r\nexports.NAV_MODAL_CLOSE = \"NAV_MODAL_CLOSE\";\r\nexports.navSectionOpen = (section) => ({\r\n    type: exports.NAV_SECTION_OPEN,\r\n    section\r\n});\r\nexports.navSectionClose = (section) => ({\r\n    type: exports.NAV_SECTION_CLOSE,\r\n    section\r\n});\r\nexports.navModalOpen = (modal) => ({\r\n    type: exports.NAV_MODAL_OPEN,\r\n    modal\r\n});\r\nexports.navModalClose = (modal) => ({\r\n    type: exports.NAV_MODAL_CLOSE,\r\n    modal\r\n});\r\n// Functions -------------------------------------------------------\r\nexports.openNavSection = (section) => (dispatch) => {\r\n    debugger;\r\n    dispatch(exports.navSectionOpen(section));\r\n};\r\nexports.closeNavSection = (section) => (dispatch) => {\r\n    dispatch(exports.navSectionClose(section));\r\n};\r\nexports.openNavModal = (modal) => (dispatch) => {\r\n    dispatch(exports.navModalOpen(modal));\r\n};\r\nexports.closeNavModal = (modal) => (dispatch) => {\r\n    dispatch(exports.navModalClose(modal));\r\n};\r\n\n\n//# sourceURL=webpack:///./client/src/actions/nav.action.ts?");

/***/ })

})