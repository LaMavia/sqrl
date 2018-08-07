webpackHotUpdate("main",{

/***/ "./client/src/actions/post.actions.ts":
/*!********************************************!*\
  !*** ./client/src/actions/post.actions.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nexports.POSTS_ARE_LOADING = \"POSTS_ARE_LOADING\";\r\nexports.POSTS_ERRORED = \"POSTS_ERRORED\";\r\nexports.POSTS_LOADED = \"POSTS_LOADED\";\r\nexports.postsAreLoading = (yayOrNay) => ({\r\n    type: exports.POSTS_ARE_LOADING,\r\n    areLoading: yayOrNay\r\n});\r\nexports.postsErrorer = (error) => ({\r\n    type: exports.POSTS_ERRORED,\r\n    error\r\n});\r\nexports.postsLoaded = (posts) => ({\r\n    type: exports.POSTS_LOADED,\r\n    posts\r\n});\r\n// Function ---------------------------------------\r\nexports.getPosts = (apiURL, conditions, limit, skip) => [apiURL, conditions, limit, skip].some(x => typeof x === \"undefined\")\r\n    ? exports.getPosts.bind(this, ...[apiURL, conditions, limit, skip])\r\n    : (dispatch) => {\r\n        dispatch(exports.postsAreLoading(true));\r\n        fetch(`${apiURL}/graphql`)\r\n            .then(res => res.json())\r\n            .then(posts => dispatch(exports.postsLoaded(posts)))\r\n            .catch(err => dispatch(exports.postsErrorer(new Error(err))))\r\n            .finally(() => dispatch(exports.postsAreLoading(false)));\r\n    };\r\n\n\n//# sourceURL=webpack:///./client/src/actions/post.actions.ts?");

/***/ })

})