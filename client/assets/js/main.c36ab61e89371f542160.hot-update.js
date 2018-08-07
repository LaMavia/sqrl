webpackHotUpdate("main",{

/***/ "./client/src/actions/post.actions.ts":
/*!********************************************!*\
  !*** ./client/src/actions/post.actions.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst sendQuery_1 = __webpack_require__(/*! ../functions/sendQuery */ \"./client/src/functions/sendQuery.ts\");\r\nexports.POSTS_ARE_LOADING = \"POSTS_ARE_LOADING\";\r\nexports.POSTS_ERRORED = \"POSTS_ERRORED\";\r\nexports.POSTS_LOADED = \"POSTS_LOADED\";\r\nexports.postsAreLoading = (yayOrNay) => ({\r\n    type: exports.POSTS_ARE_LOADING,\r\n    areLoading: yayOrNay\r\n});\r\nexports.postsErrorer = (error) => ({\r\n    type: exports.POSTS_ERRORED,\r\n    error\r\n});\r\nexports.postsLoaded = (posts) => ({\r\n    type: exports.POSTS_LOADED,\r\n    posts\r\n});\r\n// Function ---------------------------------------\r\n/**\r\n *\r\n * @param apiURL {string}\r\n * @param conditions {string}\r\n * @example getPosts(\"https://localhost:8000/graphql\", `Likes: 2, Limit: 20`)\r\n */\r\nexports.getPosts = (apiURL, conditions) => [apiURL, conditions].some(x => typeof x === \"undefined\")\r\n    // @ts-ignore because of \"this\" binding\r\n    ? exports.getPosts.bind(this, ...[apiURL, conditions, limit, skip])\r\n    : (dispatch) => {\r\n        dispatch(exports.postsAreLoading(true));\r\n        sendQuery_1.sendQuery(`\r\n      {\r\n        Posts(${conditions}) {\r\n          _id\r\n          Author\r\n          Date\r\n          Content\r\n          Likes\r\n          ImageURL\r\n          Edited\r\n        }\r\n      }\r\n    `, {}, apiURL)\r\n            .then(res => res.json())\r\n            .then(posts => dispatch(exports.postsLoaded(posts.data.Posts)))\r\n            .catch(err => dispatch(exports.postsErrorer(new Error(err))))\r\n            .finally(() => dispatch(exports.postsAreLoading(false)));\r\n    };\r\n\n\n//# sourceURL=webpack:///./client/src/actions/post.actions.ts?");

/***/ })

})