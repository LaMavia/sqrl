webpackHotUpdate("main",{

/***/ "./client/src/functions/sendQuery.ts":
/*!*******************************************!*\
  !*** ./client/src/functions/sendQuery.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nexports.sendQuery = (query, variables = {}, apiURL = `${location.origin}/graphql`) => fetch(apiURL, {\r\n    method: \"POST\",\r\n    headers: {\r\n        \"Content-Type\": \"application/json\",\r\n        Accept: \"application/json\"\r\n    },\r\n    body: JSON.stringify({ query, variables }),\r\n    mode: \"cors\"\r\n});\r\n\n\n//# sourceURL=webpack:///./client/src/functions/sendQuery.ts?");

/***/ })

})