/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["oidlib"] = factory();
	else
		root["oidlib"] = factory();
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/base/oid-base.js":
/*!******************************!*\
  !*** ./src/base/oid-base.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"OidBase\": () => (/* binding */ OidBase)\n/* harmony export */ });\n/* harmony import */ var _primitive_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./primitive.js */ \"./src/base/primitive.js\");\n\n\nclass OidBase extends _primitive_js__WEBPACK_IMPORTED_MODULE_0__.Primitive {\n  constructor () {\n    super()\n\n    this._mapTopicNotice = {}\n    this._mapNoticeTopic = {}\n    this._receiveHandler = {}\n\n    this._convertNotice = this._convertNotice.bind(this)\n    this.handleNotice = this.handleNotice.bind(this)\n    this._buildReceiveHandlers()\n    this._buildEventDispatchers()\n  }\n\n  connectedCallback () {\n    const spec = this.constructor.spec\n    if (spec && spec.properties) {\n      for (const [prop, def] of Object.entries(spec.properties))\n        if (def.default != null && !this.hasAttribute(prop))\n          this[prop] = def.default\n    }\n  }\n\n  _buildReceiveHandlers () {\n    const spec = this.constructor.spec\n    if (spec != null && spec.receive != null) {\n      // check if type is array\n      if (Array.isArray(spec.receive)) {\n        for (const notice of spec.receive)\n          this._receiveHandler[notice] =\n            this['handle' + notice[0].toUpperCase() + notice.slice(1)].bind(this)\n      } else {\n        for (const [notice, callback] of Object.entries(spec.receive))\n          this._receiveHandler[notice] = this[callback].bind(this)\n      }\n    }\n  }\n\n  _buildEventDispatchers () {\n    const spec = this.constructor.spec\n    if (spec && spec.template) {\n      let atrn = 1\n      const te = spec.template.split(\n        /@([^= >]*)[ \\t]*(?:=[ \\t]*{{[ \\t]*this\\.([^}]*)[ \\t]*}})?/)\n      if (te.length > 1) {\n        this._eventDispatch = []\n        let ntempl = ''\n        for (let i = 0; i + 2 < te.length; i += 3) {\n          ntempl +=\n            te[i] + OidBase.eventAttribute + atrn + ' '\n          const funcName = (te[i + 2] == null)\n            ? '_on' + te[i + 1][0].toUpperCase() + te[i + 1].slice(1)\n            : te[i + 2]\n          this._eventDispatch.push([\n            OidBase.eventAttribute + atrn, te[i + 1], this[funcName].bind(this)])\n          atrn++\n        }\n        spec.template = ntempl + te[te.length - 1]\n      }\n    }\n  }\n\n  disconnectedCallback () {\n    for (const topic in this._mapTopicNotice)\n      if (this._mapTopicNotice[topic] != topic)\n        this._unsubscribe(topic, this._convertNotice)\n      else\n        this._unsubscribe(topic, this.handleNotice)\n  }\n\n  static get observedAttributes () {\n    return ['publish', 'subscribe']\n  }\n\n  get publish () {\n    // return this.getAttribute('publish')\n    return this._publishProp\n  }\n\n  set publish (newValue) {\n    // this.setAttribute('publish', newValue)\n    this._publishProp = newValue\n    this._publishNoticeTopic(newValue)\n  }\n\n  get subscribe () {\n    // return this.getAttribute('subscribe')\n    return this._subscribeProp\n  }\n\n  set subscribe (newValue) {\n    // this.setAttribute('subscribe', newValue)\n    this._subscribeProp = newValue\n    this._subscribeTopicNotice(newValue)\n  }\n\n  _subscribeTopicNotice (topicNotice) {\n    const tpnts = topicNotice.split(';')\n    for (const tn of tpnts) {\n      const colon = tn.lastIndexOf(':')\n      if (colon != -1) {\n        const topic = tn.substring(0, colon)\n        this._mapTopicNotice[topic] = tn.substring(colon + 1)\n        this._subscribe(topic, this._convertNotice)\n      } else {\n        this._mapTopicNotice[tn] = tn  // store to unsubscribe\n        this._subscribe(tn, this.handleNotice)\n      }\n    }\n  }\n\n  _publishNoticeTopic (noticeTopic) {\n    const nttps = noticeTopic.split(';')\n    for (const nt of nttps) {\n      const colon = nt.lastIndexOf(':')\n      if (colon != -1)\n        this._mapNoticeTopic[nt.substring(0, colon)] = nt.substring(colon + 1)\n      else\n        this._mapNoticeTopic[nt] = nt\n    }\n    // console.log('mapNoticeTopic', this._mapNoticeTopic)\n  }\n\n  _notify (notice, message) {\n    // console.log('notify', notice, message)\n    if (this._mapNoticeTopic[notice] != null)\n      this._publish(this._mapNoticeTopic[notice], message)\n  }\n\n  _convertNotice (topic, message) {\n    this.handleNotice(this._mapTopicNotice[topic], message)\n  }\n\n  handleNotice (notice, message) {\n    if (this._receiveHandler[notice] != null)\n      this._receiveHandler[notice](notice, message)\n  }\n}\n\nOidBase.eventAttribute = 'oidevent_'\n\n//# sourceURL=webpack://oidlib/./src/base/oid-base.js?");

/***/ }),

/***/ "./src/base/oid-ui-input.js":
/*!**********************************!*\
  !*** ./src/base/oid-ui-input.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"OidUIInput\": () => (/* binding */ OidUIInput)\n/* harmony export */ });\n/* harmony import */ var _oid_ui_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./oid-ui.js */ \"./src/base/oid-ui.js\");\n/**\n * Base for all UI input components\n */\n\n\n\nclass OidUIInput extends _oid_ui_js__WEBPACK_IMPORTED_MODULE_0__.OidUI {\n  constructor () {\n    super()\n    this._value = this.getAttribute('value') || false\n  }\n\n  static get observedAttributes () {\n    return _oid_ui_js__WEBPACK_IMPORTED_MODULE_0__.OidUI.observedAttributes.concat(\n      ['variable', 'value'])\n  }\n\n  get variable () {\n    // return this.getAttribute('variable')\n    return this._variable\n  }\n\n  set variable (newValue) {\n    this._variable = newValue\n    // this.setAttribute('variable', newValue)\n  }\n\n  get value () {\n    return this._value\n  }\n\n  set value (newValue) {\n    this._value = newValue\n  }\n}\n\n\n//# sourceURL=webpack://oidlib/./src/base/oid-ui-input.js?");

/***/ }),

/***/ "./src/base/oid-ui.js":
/*!****************************!*\
  !*** ./src/base/oid-ui.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"OidUI\": () => (/* binding */ OidUI)\n/* harmony export */ });\n/* harmony import */ var _oid_base_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./oid-base.js */ \"./src/base/oid-base.js\");\n\n\nclass OidUI extends _oid_base_js__WEBPACK_IMPORTED_MODULE_0__.OidBase {\n  connectedCallback () {\n    super.connectedCallback()\n    this.render()\n  }\n\n  render () {\n    this._presentation = null\n    const spec = this.constructor.spec\n    if (spec && spec.template) {\n      let html =\n        ((spec.styles ? `<style>${spec.styles}</style>` : '') +\n         spec.template)\n        .replace(\n          /{{this\\.([^}]*)}}/g,\n          (match, p1) => {return this[p1]})\n      if (spec.shadow === false) {\n        this.innerHTML = html\n        this._presentation = this.querySelector('#oid-prs') || this\n      } else\n        this._presentation = this._shadowHTML(html)\n\n      if (this._eventDispatch) {\n        const query = (spec.shadow === false) ? this : this.shadowRoot\n        for (const [atr, event, dispatch] of this._eventDispatch) {\n          const target = query.querySelector('[' + atr + ']')\n          target.addEventListener(event, dispatch)\n        }\n      }\n    }\n  }\n\n  _shadowHTML (html) {\n    const template = document.createElement('template')\n    template.innerHTML = html\n    const clone = document.importNode(template.content, true)\n    if (!this.shadowRoot)\n      this.attachShadow({ mode: 'open' })\n    else\n      this.shadowRoot.innerHTML = ''\n    this.shadowRoot.appendChild(clone)\n    return this.shadowRoot.querySelector('#oid-prs') || clone\n  }\n}\n\n//# sourceURL=webpack://oidlib/./src/base/oid-ui.js?");

/***/ }),

/***/ "./src/base/oid.js":
/*!*************************!*\
  !*** ./src/base/oid.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Oid\": () => (/* binding */ Oid)\n/* harmony export */ });\n/* harmony import */ var _oid_base_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./oid-base.js */ \"./src/base/oid-base.js\");\n/* harmony import */ var _oid_ui_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./oid-ui.js */ \"./src/base/oid-ui.js\");\n\n\n\nclass Oid {\n  static component (spec) {\n    let impl = spec.implementation\n    if (impl == null) {\n      const inh = (spec.ui === false) ? _oid_base_js__WEBPACK_IMPORTED_MODULE_0__.OidBase : _oid_ui_js__WEBPACK_IMPORTED_MODULE_1__.OidUI\n      const className = spec.element[0].toUpperCase() +\n        spec.element.slice(1)\n          .replace(/-([a-z])/g, function (g) { return g[1].toUpperCase() })\n      impl = class extends inh { }\n      Object.defineProperty(impl, 'name', {value: className})\n    }\n    const observed = impl.observedAttributes.slice()\n    if (spec.properties) {\n      Object.defineProperty(impl, 'observedAttributes', {\n        get: function() {return this.observed}\n      })\n      for (const pname in spec.properties) {\n        const property = spec.properties[pname]\n        Object.defineProperty(impl.prototype, pname,\n          ((impl.prototype.render == null)\n            ? {\n              get: function() {return this['_' + pname]},\n              set: function(newValue) {\n                // console.log('=== set ' + pname)\n                // console.log(newValue)\n                this['_' + pname] = newValue\n              }\n            }\n            : {\n              get: function() {return this['_' + pname]},\n              set: function(newValue) {\n                // console.log('=== set ' + pname)\n                // console.log(newValue)\n                this['_' + pname] = newValue\n                this.render()\n              }\n            }))\n        if (property.attribute == null || property.attribute !== false)\n          observed.push(\n            (property.attribute) ? property.attribute : pname)\n      }\n    }\n\n    impl.prototype.attributeChangedCallback =\n      function(name, oldValue, newValue) {\n        this[name] = newValue\n      }\n\n    Object.assign(impl, {spec: spec, observed: observed})\n    customElements.define(spec.element, impl)\n  }\n}\n\n//# sourceURL=webpack://oidlib/./src/base/oid.js?");

/***/ }),

/***/ "./src/base/primitive.js":
/*!*******************************!*\
  !*** ./src/base/primitive.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Primitive\": () => (/* binding */ Primitive)\n/* harmony export */ });\n/* harmony import */ var _infra_bus_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../infra/bus.js */ \"./src/infra/bus.js\");\n\n\nclass Primitive extends HTMLElement {\n  constructor () {\n    super()\n    this._bus = _infra_bus_js__WEBPACK_IMPORTED_MODULE_0__.Bus.i\n  }\n\n  /*\n   * Bus Proxy\n   */\n\n  _subscribe (subscribed, handler) {\n    return this._bus.subscribe(subscribed, handler)\n  }\n\n  _unsubscribe (subscribed, handler) {\n    this._bus.unsubscribe(subscribed, handler)\n  }\n\n  async _publish (topic, message) {\n    await this._bus.publish(topic, message)\n  }\n}\n\n//# sourceURL=webpack://oidlib/./src/base/primitive.js?");

/***/ }),

/***/ "./src/components/ui/button-oid.js":
/*!*****************************************!*\
  !*** ./src/components/ui/button-oid.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"ButtonOid\": () => (/* binding */ ButtonOid)\n/* harmony export */ });\n/* harmony import */ var _infra_literals_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../infra/literals.js */ \"./src/infra/literals.js\");\n/* harmony import */ var _base_oid_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../base/oid.js */ \"./src/base/oid.js\");\n/* harmony import */ var _base_oid_ui_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../base/oid-ui.js */ \"./src/base/oid-ui.js\");\n\n\n\n\nclass ButtonOid extends _base_oid_ui_js__WEBPACK_IMPORTED_MODULE_2__.OidUI {\n  _onClick () {\n    this._notify('click', {value: this.value || this.label})\n  }\n\n  _onMouseenter () {\n    this._notify('mouseenter', {value: this.value || this.label})\n  }\n\n  _onMouseleave () {\n    this._notify('mouseleave', {value: this.value || this.label})\n  }\n}\n\n_base_oid_js__WEBPACK_IMPORTED_MODULE_1__.Oid.component(\n{\n  id: 'oid:button',\n  element: 'button-oid',\n  properties: {\n    label: {},\n    value: {}\n  },\n  implementation: ButtonOid,\n  styles: _infra_literals_js__WEBPACK_IMPORTED_MODULE_0__.css`\n  .button {\n    border: 1px solid lightgray;\n    border-radius: 5px;\n    margin: 5px;\n    color: #1d1d1b;\n    padding: 14px 25px;\n    text-align: center;\n    text-decoration: none;\n    display: block;\n    width: 50%;\n  }\n  .button:hover {\n    color: black;\n    font-weight: bold;\n    cursor: pointer;\n  }`,\n  template: _infra_literals_js__WEBPACK_IMPORTED_MODULE_0__.html`\n  <span id=\"oid-prs\" class=\"button\"\n    @click @mouseenter @mouseleave>\n    {{this.label}}\n  </span>`\n})\n\n//# sourceURL=webpack://oidlib/./src/components/ui/button-oid.js?");

/***/ }),

/***/ "./src/components/ui/console-oid.js":
/*!******************************************!*\
  !*** ./src/components/ui/console-oid.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"ConsoleOid\": () => (/* binding */ ConsoleOid)\n/* harmony export */ });\n/* harmony import */ var _infra_literals_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../infra/literals.js */ \"./src/infra/literals.js\");\n/* harmony import */ var _base_oid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../base/oid */ \"./src/base/oid.js\");\n/* harmony import */ var _base_oid_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../base/oid-ui */ \"./src/base/oid-ui.js\");\n\n\n\n\nclass ConsoleOid extends _base_oid_ui__WEBPACK_IMPORTED_MODULE_2__.OidUI {\n  handleDisplay (topic, message) {\n    if (this._presentation && message.value)\n      this._presentation.value += `${this.prompt} ${message.value}\\n`\n  }\n}\n\n_base_oid__WEBPACK_IMPORTED_MODULE_1__.Oid.component({\n  id: 'oid:console',\n  element: 'console-oid',\n  properties: {\n    label: {},\n    prompt: {default: '>'}\n  },\n  receive: ['display'],\n  implementation: ConsoleOid,\n  styles: _infra_literals_js__WEBPACK_IMPORTED_MODULE_0__.css`\n  .console {\n    width: 97%;\n    font-family: \"Courier New\", monospace;\n    font-size: 1em;\n    background-color: lightgray\n  }`,\n  template: _infra_literals_js__WEBPACK_IMPORTED_MODULE_0__.html`\n  <textarea class=\"console\" rows=\"10\" id=\"oid-prs\" readonly></textarea>`\n})\n\n//# sourceURL=webpack://oidlib/./src/components/ui/console-oid.js?");

/***/ }),

/***/ "./src/components/ui/switch-input-oid.js":
/*!***********************************************!*\
  !*** ./src/components/ui/switch-input-oid.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"SwitchOid\": () => (/* binding */ SwitchOid)\n/* harmony export */ });\n/* harmony import */ var _infra_literals_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../infra/literals.js */ \"./src/infra/literals.js\");\n/* harmony import */ var _base_oid_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../base/oid.js */ \"./src/base/oid.js\");\n/* harmony import */ var _base_oid_ui_input_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../base/oid-ui-input.js */ \"./src/base/oid-ui-input.js\");\n\n\n\n\nclass SwitchOid extends _base_oid_ui_input_js__WEBPACK_IMPORTED_MODULE_2__.OidUIInput {\n  constructor () {\n    super()\n    if (this.hasAttribute('value'))\n      this.value = false\n  }\n\n  render () {\n    super.render()\n    this._input = this._presentation.querySelector('#oid-input')\n  }\n\n  handleInvert (topic, message) {\n    this.value = !this.value\n    if (this.value)\n      this._input.checked = true\n    else\n      this._input.checked = false\n  }\n}\n\n_base_oid_js__WEBPACK_IMPORTED_MODULE_1__.Oid.component(\n{\n  id: 'oid:switch',\n  element: 'switch-oid',\n  // properties: variable and value inherited from OidUIInput\n  receive: ['invert'],\n  implementation: SwitchOid,\n  styles: _infra_literals_js__WEBPACK_IMPORTED_MODULE_0__.css`\n  .switch {\n    position: relative;\n    display: inline-block;\n    width: 60px;\n    height: 34px;\n  }\n  .switch input {\n    opacity: 0;\n    width: 0;\n    height: 0;\n  }\n  .slider {\n    position: absolute;\n    cursor: pointer;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    background-color: #ccc;\n    -webkit-transition: .4s;\n    transition: .4s;\n  }\n  .slider:before {\n    position: absolute;\n    content: \"\";\n    height: 26px;\n    width: 26px;\n    left: 4px;\n    bottom: 4px;\n    background-color: white;\n    -webkit-transition: .4s;\n    transition: .4s;\n  }\n  input:checked + .slider {\n    background-color: #2196F3;\n  }\n  input:focus + .slider {\n    box-shadow: 0 0 1px #2196F3;\n  }\n  input:checked + .slider:before {\n    -webkit-transform: translateX(26px);\n    -ms-transform: translateX(26px);\n    transform: translateX(26px);\n  }\n  .slider.round {\n    border-radius: 34px;\n  }\n  .slider.round:before {\n    border-radius: 50%;\n  }`,\n  template: _infra_literals_js__WEBPACK_IMPORTED_MODULE_0__.html`\n  <label id=\"oid-prs\" class=\"switch\">\n    <input id=\"oid-input\" type=\"checkbox\">\n    <span class=\"slider round\"></span>\n  </label>`\n})\n\n//# sourceURL=webpack://oidlib/./src/components/ui/switch-input-oid.js?");

/***/ }),

/***/ "./src/infra/bus.js":
/*!**************************!*\
  !*** ./src/infra/bus.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Bus\": () => (/* binding */ Bus)\n/* harmony export */ });\nclass Bus {\n  constructor() {\n    this._listeners = []\n    this._providers = {}\n    this._connections = {}\n  }\n\n  subscribe (subscribed, handler) {\n    if (subscribed != null) {\n      let topics = {}\n      if (typeof subscribed === 'string' && handler != null)\n        topics[subscribed] = handler\n      else if (typeof subscribed === 'object')\n        topics = subscribed\n      // console.log('=== subscribe')\n      // console.log(topics)\n      const listeners = this._listeners.slice()\n      for (const tp in topics) {\n        if (topics[tp] != null) {\n          // topic filter: transform wildcards in regular expressions\n          if (tp.includes('+') || tp.includes('#')) {\n            listeners.push({\n              topic: tp,\n              regexp: Bus._convertRegExp(tp),\n              handler: topics[tp]\n            })\n          } else {\n            listeners.push({\n              topic: tp,\n              handler: topics[tp]\n            })\n          }\n        }\n      }\n      this._listeners = listeners\n    }\n  }\n\n  unsubscribe (subscribed) {\n    if (subscribed != null) {\n      const topics = {}\n      if (typeof subscribed === 'string' && handler != null)\n        topics[subscribed] = handler\n      else if (typeof subscribed === 'object')\n        topics = subscribed\n      const listeners = this._listeners.slice()\n      for (const tp in topics) {\n        for (const l in this._listeners) {\n          if (this._listeners[l].topic === tp &&\n              this._listeners[l].handler === topics[tp]) {\n            listeners.splice(l, 1)\n            break\n          }\n        }\n      }\n      this._listeners = listeners\n    }\n  }\n\n  async publish (topic, message) {\n    // console.log('=== publish')\n    // console.log(topic)\n    // console.log(this._listeners)\n    let matched = false\n    const listeners = this._listeners\n    for (const l in listeners) {\n      if (listeners[l].regexp) {\n        const matchStr = listeners[l].regexp.exec(topic)\n        if (matchStr != null && matchStr[0] === topic) { matched = true }\n      } else if (listeners[l].topic === topic)\n        matched = true\n      if (matched)\n        listeners[l].handler(topic, message)\n    }\n  }\n\n  /* Message analysis services\n     *************************/\n\n  static _convertRegExp (filter) {\n    return new RegExp(filter.replace(/\\//g, '\\\\/')\n      .replace(/\\+/g, '[^\\/]+')\n      .replace(/#/g, '.+'))\n  }\n}\n\nBus.i = new Bus()\n\n//# sourceURL=webpack://oidlib/./src/infra/bus.js?");

/***/ }),

/***/ "./src/infra/literals.js":
/*!*******************************!*\
  !*** ./src/infra/literals.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"css\": () => (/* binding */ css),\n/* harmony export */   \"html\": () => (/* binding */ html)\n/* harmony export */ });\nconst html =\n  (strings, ...values) =>\n  String.raw({ raw: strings }, ...values)\n\nconst css =\n  (strings, ...values) =>\n  String.raw({ raw: strings }, ...values)\n\n//# sourceURL=webpack://oidlib/./src/infra/literals.js?");

/***/ }),

/***/ "./src/lib/index.js":
/*!**************************!*\
  !*** ./src/lib/index.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Bus\": () => (/* reexport safe */ _infra_bus_js__WEBPACK_IMPORTED_MODULE_1__.Bus),\n/* harmony export */   \"ButtonOid\": () => (/* reexport safe */ _components_ui_button_oid_js__WEBPACK_IMPORTED_MODULE_6__.ButtonOid),\n/* harmony export */   \"ConsoleOid\": () => (/* reexport safe */ _components_ui_console_oid_js__WEBPACK_IMPORTED_MODULE_8__.ConsoleOid),\n/* harmony export */   \"Oid\": () => (/* reexport safe */ _base_oid_js__WEBPACK_IMPORTED_MODULE_3__.Oid),\n/* harmony export */   \"OidBase\": () => (/* reexport safe */ _base_oid_base_js__WEBPACK_IMPORTED_MODULE_4__.OidBase),\n/* harmony export */   \"OidUI\": () => (/* reexport safe */ _base_oid_ui_js__WEBPACK_IMPORTED_MODULE_5__.OidUI),\n/* harmony export */   \"Primitive\": () => (/* reexport safe */ _base_primitive_js__WEBPACK_IMPORTED_MODULE_2__.Primitive),\n/* harmony export */   \"SwitchOid\": () => (/* reexport safe */ _components_ui_switch_input_oid_js__WEBPACK_IMPORTED_MODULE_7__.SwitchOid),\n/* harmony export */   \"css\": () => (/* reexport safe */ _infra_literals_js__WEBPACK_IMPORTED_MODULE_0__.css),\n/* harmony export */   \"html\": () => (/* reexport safe */ _infra_literals_js__WEBPACK_IMPORTED_MODULE_0__.html)\n/* harmony export */ });\n/* harmony import */ var _infra_literals_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../infra/literals.js */ \"./src/infra/literals.js\");\n/* harmony import */ var _infra_bus_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../infra/bus.js */ \"./src/infra/bus.js\");\n/* harmony import */ var _base_primitive_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../base/primitive.js */ \"./src/base/primitive.js\");\n/* harmony import */ var _base_oid_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../base/oid.js */ \"./src/base/oid.js\");\n/* harmony import */ var _base_oid_base_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../base/oid-base.js */ \"./src/base/oid-base.js\");\n/* harmony import */ var _base_oid_ui_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../base/oid-ui.js */ \"./src/base/oid-ui.js\");\n/* harmony import */ var _components_ui_button_oid_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/ui/button-oid.js */ \"./src/components/ui/button-oid.js\");\n/* harmony import */ var _components_ui_switch_input_oid_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components/ui/switch-input-oid.js */ \"./src/components/ui/switch-input-oid.js\");\n/* harmony import */ var _components_ui_console_oid_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../components/ui/console-oid.js */ \"./src/components/ui/console-oid.js\");\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n//# sourceURL=webpack://oidlib/./src/lib/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/lib/index.js");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});