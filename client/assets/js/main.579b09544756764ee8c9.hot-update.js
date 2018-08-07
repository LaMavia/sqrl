webpackHotUpdate("main",{

/***/ "./client/src/components/Nav.tsx":
/*!***************************************!*\
  !*** ./client/src/components/Nav.tsx ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst react_1 = __importDefault(__webpack_require__(/*! react */ \"./node_modules/react/index.js\"));\r\nconst react_redux_1 = __webpack_require__(/*! react-redux */ \"./node_modules/react-redux/es/index.js\");\r\nconst nav_action_1 = __webpack_require__(/*! ../actions/nav.action */ \"./client/src/actions/nav.action.ts\");\r\nconst react_svg_1 = __importDefault(__webpack_require__(/*! react-svg */ \"./node_modules/react-svg/es/react-svg.js\"));\r\nconst react_router_dom_1 = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router-dom/es/index.js\");\r\nconst connectedNav = ({ sections, links, modals, openSection, closeSection, openModal, closeModal }) => {\r\n    let i = 0;\r\n    const renderSections = (sections) => {\r\n        const renderedList = [];\r\n        for (const name in sections) {\r\n            const s = sections[name];\r\n            renderedList.unshift((react_1.default.createElement(\"li\", { className: \"nav__items__item\", key: i++ },\r\n                react_1.default.createElement(react_svg_1.default, { className: \"nav__items__item__icon\", path: s.icon, onClick: openSection(name) }),\r\n                react_1.default.createElement(\"ul\", { className: \"nav__items__item__drawer\" }, s.items.map((item, i) => (react_1.default.createElement(\"li\", { onClick: closeSection(name), className: \"nav__items__item__drawer__item\", key: i },\r\n                    react_1.default.createElement(react_router_dom_1.NavLink, { to: item.href }, item.name))))),\r\n                react_1.default.createElement(\"div\", { className: \"nav__items__item__click-catcher\" }))));\r\n        }\r\n        return renderedList;\r\n    };\r\n    const renderLinks = (links) => links && links.map(link => (react_1.default.createElement(\"li\", { className: \"nav__items__item\", key: i++ },\r\n        react_1.default.createElement(react_router_dom_1.NavLink, { to: link.href, className: \"nav__items__item__link\" },\r\n            react_1.default.createElement(react_svg_1.default, { path: link.icon, className: \"nav__items__item__link__icon\" })))));\r\n    const renderModals = (btns) => btns && btns.map(btn => {\r\n        const Modal = btn.modal;\r\n        return (react_1.default.createElement(\"li\", { className: \"nav__items__item\", key: i++ },\r\n            react_1.default.createElement(\"button\", { className: \"nav__items__item__btn\", onClick: openModal(btn.name) },\r\n                react_1.default.createElement(react_svg_1.default, { path: btn.icon })),\r\n            react_1.default.createElement(\"div\", { className: \"nav__items__item__modal\", style: { visibility: btn.open ? \"visible\" : \"hidden\" } },\r\n                react_1.default.createElement(Modal, null),\r\n                react_1.default.createElement(\"div\", { className: \"nav__items__item__modal__click-catcher\", onClick: closeModal(btn.name) }))));\r\n    });\r\n    return (react_1.default.createElement(\"nav\", { className: \"nav\" },\r\n        react_1.default.createElement(\"ul\", { className: \"nav__items\" },\r\n            renderSections(sections),\r\n            renderLinks(links),\r\n            renderModals(modals))));\r\n};\r\nconst mapStateToProps = (state) => ({\r\n    sections: state.nav.sections,\r\n    links: state.nav.links,\r\n    modals: state.nav.modals\r\n});\r\nconst mapDispatchToProps = (_dispatch) => ({\r\n    openSection: (section) => nav_action_1.openNavSection.bind({}, section),\r\n    closeSection: (section) => nav_action_1.closeNavSection.bind({}, section),\r\n    openModal: (modal) => nav_action_1.openNavModal.bind({}, modal),\r\n    closeModal: (modal) => nav_action_1.closeNavModal.bind({}, modal)\r\n});\r\nexports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(connectedNav);\r\n\n\n//# sourceURL=webpack:///./client/src/components/Nav.tsx?");

/***/ })

})