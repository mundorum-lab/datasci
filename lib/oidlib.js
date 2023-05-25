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

/***/ "./src/base/interfaces-base.js":
/*!*************************************!*\
  !*** ./src/base/interfaces-base.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _oid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./oid */ \"./src/base/oid.js\");\n\n\n_oid__WEBPACK_IMPORTED_MODULE_0__.Oid.cInterface ({\n  id: 'itf:oid',\n  operations: {\n    'get': {response: true},\n    'set': {response: false}\n  },\n  cardinality: 'n:n'\n})\n\n//# sourceURL=webpack://oidlib/./src/base/interfaces-base.js?");

/***/ }),

/***/ "./src/base/oid-base.js":
/*!******************************!*\
  !*** ./src/base/oid-base.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"OidBase\": () => (/* binding */ OidBase)\n/* harmony export */ });\n/* harmony import */ var _infra_bus_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../infra/bus.js */ \"./src/infra/bus.js\");\n/* harmony import */ var _oid_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./oid.js */ \"./src/base/oid.js\");\n/* harmony import */ var _primitive_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./primitive.js */ \"./src/base/primitive.js\");\n\n\n\n\nclass OidBase extends _primitive_js__WEBPACK_IMPORTED_MODULE_2__.Primitive {\n  constructor () {\n    super()\n\n    this._mapTopicNotice = {}\n    this._rgxTopicNotice = []\n    this._mapNoticeTopic = {}\n    this._receiveHandler = {}\n    this._provideHandler = {}\n    this._connected = {}\n\n    this._convertNotice = this._convertNotice.bind(this)\n    this.handleNotice = this.handleNotice.bind(this)\n\n    if (!this.connectedCallback)\n      this._initialize()\n  }\n\n  _initialize () {\n    const spec = this.constructor.spec\n    if (spec) {\n      this._buildHandlers(this._receiveHandler, spec.receive)\n      this._buildProviders()\n      this._buildProvidersHandlers()\n      this._buildEventDispatchers(spec.dispatcher)\n    }\n\n    if (spec && spec.properties) {\n      for (const [prop, def] of Object.entries(spec.properties))\n        if (def.default != null && !this.hasAttribute(prop))\n          this[prop] = def.default\n    }\n  }\n\n  _buildProviders () {\n    const spec = this.constructor.spec\n    if (spec.provide != null && this.id)\n      for (const p in spec.provide)\n        this._provide(p, this.id, this)\n  }\n\n  _buildProvidersHandlers () {\n    const spec = this.constructor.spec\n    if (spec.provide != null)\n      for (const p in spec.provide) {\n        this._buildHandlers(\n          this._provideHandler, spec.provide[p].operations, p)\n      }\n  }\n\n  _removeProviders () {\n    const spec = this.constructor.spec\n    if (spec.provide != null && this.id)\n      for (const p in spec.provide)\n          this._withhold(p, this.id)\n  }\n\n  _buildHandlers (handlerSet, handlersSpec, cInterface) {\n    if (handlersSpec != null) {\n      const prefix = (cInterface == null) ? '' : cInterface + '.'\n      if (Array.isArray(handlersSpec)) {\n        for (const notice of handlersSpec)\n          if (handlerSet[prefix + notice] == null)\n            handlerSet[prefix + notice] =\n              this['handle' + notice[0].toUpperCase() +\n              notice.slice(1)].bind(this)\n      } else {\n        for (const [notice, noticeSpec] of Object.entries(handlersSpec)) {\n          if (handlerSet[prefix + notice] == null) {\n            const meth = (typeof noticeSpec === 'string')\n              ? noticeSpec\n              : ((noticeSpec.handler != null)\n                  ? noticeSpec.handler\n                  : 'handle' + notice[0].toUpperCase() + notice.slice(1))\n            handlerSet[prefix + notice] = this[meth].bind(this)\n          }\n        }\n      }\n    }\n  }\n\n  _buildEventDispatchers (dispatcherTempl) {\n    if (dispatcherTempl) {\n      this._dispatcher = []\n      for (const [atr, event, dispatch] of dispatcherTempl)\n        this._dispatcher.push([atr, event, dispatch.bind(this)])\n    }\n  }\n\n  _finalize () {\n    this._removeProviders()\n    for (const topic in this._mapTopicNotice)\n      if (this._mapTopicNotice[topic] != topic)\n        this._unsubscribe(topic, this._convertNotice)\n      else\n        this._unsubscribe(topic, this.handleNotice)\n  }\n\n  // call setter every time an observed attribute changes\n  attributeChangedCallback (name, oldValue, newValue) {\n    const jsName = name.replace(\n      /-([a-z])/g, (match, letter) => letter.toUpperCase())\n    this[jsName] = newValue\n  }\n\n  static get observedAttributes () {\n    return ['id', 'publish', 'subscribe', 'connect']\n  }\n\n  get id () {\n    return this._id\n  }\n\n  set id (newValue) {\n    if (this._id != null)\n      this._removeProviders()\n    this._id = newValue\n    this._buildProviders()\n  }\n\n  get publish () {\n    return this._publishProp\n  }\n\n  set publish (newValue) {\n    this._publishProp = newValue\n    this._publishNoticeTopic(newValue)\n  }\n\n  get subscribe () {\n    return this._subscribeProp\n  }\n\n  set subscribe (newValue) {\n    this._subscribeProp = newValue\n    this._subscribeTopicNotice(newValue)\n  }\n\n  get connect () {\n    return this._connectProp\n  }\n\n  set connect (newValue) {\n    this._connectProp = newValue\n    this._connectInterface(newValue)\n  }\n\n  handleGet (notice, message) {\n    if (message.property != null)\n      return this[message.property]\n    else\n      return null\n  }\n\n  handleSet (notice, message) {\n    if (message.property != null && message.value != null)\n      this[message.property] = message.value\n  }\n\n  _subscribeTopicNotice (topicNotice) {\n    const tpnts = topicNotice.split(';')\n    for (const tn of tpnts) {\n      const parts = tn.split('~')\n      if (parts.length > 1) {\n        const topic = parts[0].trim()\n        if (topic.includes('+') || topic.includes('#'))\n          this._rgxTopicNotice.push(\n            [_infra_bus_js__WEBPACK_IMPORTED_MODULE_0__.Bus._convertRegExp(topic), parts[1].trim(), topic])\n        else\n          this._mapTopicNotice[topic] = parts[1].trim()\n        this._subscribe(topic, this._convertNotice)\n      } else {\n        const topic = tn.trim()\n        this._mapTopicNotice[topic] = topic  // store to unsubscribe\n        this._subscribe(topic, this.handleNotice)\n      }\n    }\n    // console.log('=== component subscribed')\n    // console.log(this._mapTopicNotice)\n  }\n\n  _publishNoticeTopic (noticeTopic) {\n    const nttps = noticeTopic.split(';')\n    for (const nt of nttps) {\n      const parts = nt.split('~')\n      if (parts.length > 1)\n        this._mapNoticeTopic[parts[0].trim()] = parts[1].trim()\n      else\n        this._mapNoticeTopic[nt.trim()] = nt.trim()\n    }\n    // console.log('mapNoticeTopic', this._mapNoticeTopic)\n  }\n\n  _connectInterface (idInterface) {\n    let status = true\n    const idint = idInterface.split(';')\n    for (const ii of idint) {\n      const parts = ii.split('#')\n      if (parts.length > 1) {\n        this._connect(parts[0].trim(), parts[1].trim(), this)\n        // console.log('=== connect', parts[0].trim(), parts[1].trim(), this)\n      } else\n        status = false\n    }\n    return status\n  }\n\n  _notify (notice, message) {\n    // console.log('notify', notice, message)\n    if (this._mapNoticeTopic[notice] != null)\n      this._publish(this._mapNoticeTopic[notice], message)\n  }\n\n  _convertNotice (topic, message) {\n    if (this._mapTopicNotice[topic] != null)\n      this.handleNotice(this._mapTopicNotice[topic], message)\n    else\n      for (const [rgx, notice] of this._rgxTopicNotice) {\n        const match = rgx.exec(topic)\n        if (match != null && match[0] === topic) {\n          this.handleNotice(notice, message)\n          break\n        }\n      }\n  }\n\n  connectTo (cInterface, component) {\n    if (component.id)\n      this._connect(cInterface, component.id, this)\n  }\n\n  connectionReady(cInterface, id, component) {\n    // console.log('=== connectionReady', id, cInterface, component)\n    if (this._connected[cInterface] == null)\n      this._connected[cInterface] = []\n    this._connected[cInterface].push(id)\n  }\n\n  async _invoke (cInterface, notice, message) {\n    // console.log('=== invoke', cInterface, notice, message)\n    // console.log(this._connected)\n    const intSpec = _oid_js__WEBPACK_IMPORTED_MODULE_1__.Oid.getInterface(cInterface)\n    // console.log('=== intSpec')\n    // console.log(intSpec)\n    if (this._connected[cInterface] != null) {\n      if (intSpec.response != null &&\n          intSpec.response === true) {\n        const responses = []\n        for (const id of this._connected[cInterface])\n          responses.push(await this._bus.invoke (cInterface, id, notice, message))\n        return (intSpec.cardinality &&\n                intSpec.cardinality[2] == '1')\n                ? responses[0] : responses\n      } else {\n        // console.log('=== invoking', this._connected[cInterface])\n        for (const id of this._connected[cInterface])\n          return await this._bus.invoke (cInterface, id, notice, message)\n      }\n    }\n  }\n\n  handleNotice (notice, message) {\n    if (this._receiveHandler[notice] != null)\n      this._receiveHandler[notice](notice, message)\n  }\n\n  handleInvoke (cInterface, notice, message) {\n    // console.log('=== handleInvoke', cInterface, notice, message)\n    // console.log(this._provideHandler)\n    let response = null\n    if (this._provideHandler[cInterface + '.' + notice] != null)\n      response =\n        this._provideHandler[cInterface + '.' + notice](notice, message)\n    return response\n  }\n}\n\n//# sourceURL=webpack://oidlib/./src/base/oid-base.js?");

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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"OidUI\": () => (/* binding */ OidUI)\n/* harmony export */ });\n/* harmony import */ var _oid_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./oid.js */ \"./src/base/oid.js\");\n/* harmony import */ var _oid_web_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./oid-web.js */ \"./src/base/oid-web.js\");\n\n\n\nclass OidUI extends _oid_web_js__WEBPACK_IMPORTED_MODULE_1__.OidWeb {\n  connectedCallback () {\n    super.connectedCallback()\n    this.render()\n  }\n\n  render () {\n    const spec = this.constructor.spec\n\n    // handles a dynamic template\n    let template = (spec != null) ? spec.template : null\n    if (this.template) {\n      const tmpl = this.template()\n      if (tmpl != this._template) {\n        this._template = tmpl\n        const td = _oid_js__WEBPACK_IMPORTED_MODULE_0__.Oid.prepareDispatchers(tmpl, this.constructor)\n        this._templatePre = td.template\n        this._buildEventDispatchers(td.dispatcher, this)\n      }\n      template = this._templatePre\n    }\n\n    this._presentation = null\n    if (spec != null && template != null) {\n      let html =\n        ((spec.styles ? `<style>${spec.styles}</style>` : '') +\n         template)\n        .replace(\n          /{{this\\.([^}]*)}}/g,\n          (match, p1) => {return this[p1]})\n\n      if (spec.shadow === false) {\n        this.innerHTML = html\n        this._presentation = this.querySelector('#oid-prs') || this\n      } else\n        this._presentation = this._shadowHTML(html)\n\n      if (this._dispatcher) {\n        const query = (spec.shadow === false) ? this : this.shadowRoot\n        for (const [atr, event, dispatch] of this._dispatcher) {\n          const target = query.querySelector('[' + atr + ']')\n          target.addEventListener(event, dispatch)\n        }\n      }\n    }\n  }\n\n  _shadowHTML (html) {\n    const template = document.createElement('template')\n    template.innerHTML = html\n    const clone = document.importNode(template.content, true)\n    if (!this.shadowRoot)\n      this.attachShadow({ mode: 'open' })\n    else\n      this.shadowRoot.innerHTML = ''\n    this.shadowRoot.appendChild(clone)\n    return this.shadowRoot.querySelector('#oid-prs') || clone\n  }\n}\n\n//# sourceURL=webpack://oidlib/./src/base/oid-ui.js?");

/***/ }),

/***/ "./src/base/oid-web.js":
/*!*****************************!*\
  !*** ./src/base/oid-web.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"OidWeb\": () => (/* binding */ OidWeb)\n/* harmony export */ });\n/* harmony import */ var _oid_base_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./oid-base.js */ \"./src/base/oid-base.js\");\n\n\nclass OidWeb extends _oid_base_js__WEBPACK_IMPORTED_MODULE_0__.OidBase {\n  connectedCallback () {\n    this._initialize()\n  }\n\n  disconnectedCallback () {\n    this._finalize()\n  }\n}\n\n//# sourceURL=webpack://oidlib/./src/base/oid-web.js?");

/***/ }),

/***/ "./src/base/oid.js":
/*!*************************!*\
  !*** ./src/base/oid.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Oid\": () => (/* binding */ Oid)\n/* harmony export */ });\n/* harmony import */ var _oid_base_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./oid-base.js */ \"./src/base/oid-base.js\");\n/* harmony import */ var _oid_web_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./oid-web.js */ \"./src/base/oid-web.js\");\n/* harmony import */ var _oid_ui_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./oid-ui.js */ \"./src/base/oid-ui.js\");\n\n\n\n\nclass Oid {\n  static eventAttribute = 'oidevent_'\n  static defaultInterface = ['itf:oid']\n\n  static _interfaceReg = {}\n  static _oidReg = {}\n\n  static cInterface (spec) {\n    if (spec != null)\n      Oid._interfaceReg[spec.id] = spec\n  }\n\n  static getInterface (cInterface) {\n    return Oid._interfaceReg[cInterface]\n  }\n\n  static component (spec) {\n    // define the class implementation\n    let impl = spec.implementation\n    if (impl == null) {\n      const inh =\n        (spec.ui === false || spec.template == null)\n          ? ((spec.element == null) ? _oid_base_js__WEBPACK_IMPORTED_MODULE_0__.OidBase : _oid_web_js__WEBPACK_IMPORTED_MODULE_1__.OidWeb)\n          : _oid_ui_js__WEBPACK_IMPORTED_MODULE_2__.OidUI\n      const className = spec.element[0].toUpperCase() +\n        spec.element.slice(1)\n          .replace(/-([a-z])/g, (match, letter) => letter.toUpperCase())\n      impl = class extends inh { }\n      Object.defineProperty(impl, 'name', {value: className})\n    }\n\n    // build property getters and setters\n    const observed = impl.observedAttributes.slice()\n    if (spec.properties) {\n      Object.defineProperty(impl, 'observedAttributes', {\n        get: function() { return this.observed }\n      })\n      for (const pname in spec.properties) {\n        const property = spec.properties[pname]\n        const jsName = pname.replace(\n          /-([a-z])/g, (match, letter) => letter.toUpperCase())\n        Object.defineProperty(impl.prototype, jsName,\n          ((impl.prototype.render == null)\n            ? {\n              get: function() {return this['_' + jsName]},\n              set: function(newValue) {\n                this['_' + jsName] = newValue\n              }\n            }\n            : {\n              get: function() {return this['_' + jsName]},\n              set: function(newValue) {\n                this['_' + jsName] = newValue\n                this.render()\n              }\n            }))\n        if (property.attribute == null || property.attribute !== false)\n          observed.push(pname)\n      }\n    }\n\n    // associate interface ids to specifications\n    spec.provide = (spec.provide == null)\n      ? Oid.defaultInterface : spec.provide.concat(Oid.defaultInterface)\n    if (spec.provide) {\n      const provideSpec = {}\n      for (const p of spec.provide) {\n        const cInterface = Oid._interfaceReg[p]\n        if (cInterface == null)\n          throw new Error('Unknown interface id: ' + p)\n        else\n          provideSpec[p] = cInterface\n      }\n      spec.provide = provideSpec\n    }\n\n    const td = Oid.prepareDispatchers(spec.template, impl)\n    spec.template = td.template\n    if (td.dispatcher)\n      spec.dispatcher = td.dispatcher\n\n    // attach the specification to the implementation\n    Object.assign(impl, {spec: spec, observed: observed})\n  \n    // <TODO> provisory - classes without element will not inherit HTMLElement\n    if (spec.element == null)\n      spec.element = 'internal-' + spec.id.replace(':', '-')\n    customElements.define(spec.element, impl)\n  \n    // register the implementation in the dictionary\n    Oid._oidReg[spec.id] = impl\n  }\n\n  static prepareDispatchers (template, impl) {\n    let dispatcher = null\n    if (template) {\n      let atrn = 1\n      const te = template.split(\n        /@([^= >]*)[ \\t]*(?:=[ \\t]*{{[ \\t]*this\\.([^}]*)[ \\t]*}})?/)\n      if (te.length > 1) {\n        dispatcher = []\n        let ntempl = ''\n        for (let i = 0; i + 2 < te.length; i += 3) {\n          ntempl +=\n            te[i] + Oid.eventAttribute + atrn + ' '\n          const funcName = (te[i + 2] == null)\n            ? '_on' + te[i + 1][0].toUpperCase() + te[i + 1].slice(1)\n            : te[i + 2]\n          dispatcher.push([\n            Oid.eventAttribute + atrn, te[i + 1],\n            impl.prototype[funcName]])\n          atrn++\n        }\n        template = ntempl + te[te.length - 1]\n      }\n    }\n    return {\n      template: template,\n      dispatcher: dispatcher\n    }\n  }\n\n  static create (componentId, properties) {\n    const impl = Oid._oidReg[componentId]\n    if (impl == null)\n      throw new Error('Unknown component id: ' + componentId)\n    const instance = document.createElement(impl.spec.element)\n    if (properties != null) {\n      for (const p in properties)\n        instance.setAttribute(p, properties[p])\n    }\n    return instance\n  }\n}\n\n//# sourceURL=webpack://oidlib/./src/base/oid.js?");

/***/ }),

/***/ "./src/base/primitive.js":
/*!*******************************!*\
  !*** ./src/base/primitive.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Primitive\": () => (/* binding */ Primitive)\n/* harmony export */ });\n/* harmony import */ var _infra_bus_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../infra/bus.js */ \"./src/infra/bus.js\");\n\n\nclass Primitive extends HTMLElement {\n  constructor () {\n    super()\n    this._bus = _infra_bus_js__WEBPACK_IMPORTED_MODULE_0__.Bus.i\n  }\n\n  /*\n   * Bus Proxy\n   */\n\n  _subscribe (subscribed, handler) {\n    return this._bus.subscribe(subscribed, handler)\n  }\n\n  _unsubscribe (subscribed, handler) {\n    this._bus.unsubscribe(subscribed, handler)\n  }\n\n  async _publish (topic, message) {\n    await this._bus.publish(topic, message)\n  }\n\n  _provide (cInterface, id, provider) {\n    this._bus.provide(cInterface, id, provider)\n  }\n\n  _withhold (cInterface, id) {\n    this._bus.withhold(cInterface, id)\n  }\n\n  _connect (cInterface, id, callback) {\n    this._bus.connect(cInterface, id, callback)\n  }\n\n  async _invoke (cInterface, id, notice, message) {\n    return await this._bus.invoke (cInterface, id, notice, message)\n  }\n}\n\n//# sourceURL=webpack://oidlib/./src/base/primitive.js?");

/***/ }),

/***/ "./src/components/data/file-oid.js":
/*!*****************************************!*\
  !*** ./src/components/data/file-oid.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"FileOid\": () => (/* binding */ FileOid)\n/* harmony export */ });\n/* harmony import */ var _infra_literals_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../infra/literals.js */ \"./src/infra/literals.js\");\n/* harmony import */ var _base_oid_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../base/oid.js */ \"./src/base/oid.js\");\n/* harmony import */ var _base_oid_ui_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../base/oid-ui.js */ \"./src/base/oid-ui.js\");\n\n\n\n\nclass FileOid extends _base_oid_ui_js__WEBPACK_IMPORTED_MODULE_2__.OidUI {\n  _onDragover (event) {\n    if (this.pre)\n      this._presentation.innerHTML = this.pre\n    event.preventDefault()\n  }\n\n  async _onDrop (event) {\n    event.preventDefault()\n    if (this.post)\n      this._presentation.innerHTML = this.post\n\n    let file = null\n    if (event.dataTransfer.items) {\n      for (let item of event.dataTransfer.items) {\n        if (item.kind === 'file')\n          file = item.getAsFile()\n      }\n    } else\n      file = event.dataTransfer.files[0]\n    const content = await file.text()\n    this._notify('loaded', {value: content})\n    this._invoke('itf:transfer', 'send', {value: content})\n  }\n}\n\n_base_oid_js__WEBPACK_IMPORTED_MODULE_1__.Oid.component(\n{\n  id: 'oid:file',\n  element: 'file-oid',\n  properties: {\n    label: { default: 'Drop Zone' },\n    pre:   { default: 'Drop your file here' },\n    post:  { default: 'File loaded' }\n  },\n  implementation: FileOid,\n  styles: _infra_literals_js__WEBPACK_IMPORTED_MODULE_0__.css`\n  #oid-prs {\n    border: 5px solid;\n  }`,\n  template: _infra_literals_js__WEBPACK_IMPORTED_MODULE_0__.html`\n  <div id=\"oid-prs\" @dragover @drop>{{this.label}}</div>`\n})\n\n//# sourceURL=webpack://oidlib/./src/components/data/file-oid.js?");

/***/ }),

/***/ "./src/components/interfaces-components.js":
/*!*************************************************!*\
  !*** ./src/components/interfaces-components.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _base_oid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../base/oid */ \"./src/base/oid.js\");\n\n\n_base_oid__WEBPACK_IMPORTED_MODULE_0__.Oid.cInterface ({\n  id: 'itf:transfer',\n  operations: ['send'],\n  cardinality: 'n:n'\n})\n\n_base_oid__WEBPACK_IMPORTED_MODULE_0__.Oid.cInterface ({\n  id: 'itf:iterate',\n  operations: {\n    'first': {response: true},\n    'next': {response: true}\n  },\n  cardinality: '1:n'\n})\n\n//# sourceURL=webpack://oidlib/./src/components/interfaces-components.js?");

/***/ }),

/***/ "./src/components/ui/button-oid.js":
/*!*****************************************!*\
  !*** ./src/components/ui/button-oid.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"ButtonOid\": () => (/* binding */ ButtonOid)\n/* harmony export */ });\n/* harmony import */ var _infra_literals_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../infra/literals.js */ \"./src/infra/literals.js\");\n/* harmony import */ var _base_oid_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../base/oid.js */ \"./src/base/oid.js\");\n/* harmony import */ var _base_oid_ui_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../base/oid-ui.js */ \"./src/base/oid-ui.js\");\n\n\n\n\nclass ButtonOid extends _base_oid_ui_js__WEBPACK_IMPORTED_MODULE_2__.OidUI {\n  _onClick () {\n    this._notify('click', {value: this.value || this.label})\n    this._invoke('itf:transfer', 'send', {value: this.value || this.label})\n  }\n\n  _onMouseenter () {\n    this._notify('mouseenter', {value: this.value || this.label})\n  }\n\n  _onMouseleave () {\n    this._notify('mouseleave', {value: this.value || this.label})\n  }\n}\n\n_base_oid_js__WEBPACK_IMPORTED_MODULE_1__.Oid.component(\n{\n  id: 'oid:button',\n  element: 'button-oid',\n  properties: {\n    label: {},\n    value: {}\n  },\n  implementation: ButtonOid,\n  styles: _infra_literals_js__WEBPACK_IMPORTED_MODULE_0__.css`\n  .button {\n    border: 1px solid lightgray;\n    border-radius: 5px;\n    margin: 5px;\n    color: #1d1d1b;\n    padding: 14px 25px;\n    text-align: center;\n    text-decoration: none;\n    display: block;\n    width: 50%;\n  }\n  .button:hover {\n    color: black;\n    font-weight: bold;\n    cursor: pointer;\n  }`,\n  template: _infra_literals_js__WEBPACK_IMPORTED_MODULE_0__.html`\n  <span id=\"oid-prs\" class=\"button\"\n    @click @mouseenter @mouseleave>\n    {{this.label}}\n  </span>`\n})\n\n//# sourceURL=webpack://oidlib/./src/components/ui/button-oid.js?");

/***/ }),

/***/ "./src/components/ui/console-oid.js":
/*!******************************************!*\
  !*** ./src/components/ui/console-oid.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"ConsoleOid\": () => (/* binding */ ConsoleOid)\n/* harmony export */ });\n/* harmony import */ var _infra_literals_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../infra/literals.js */ \"./src/infra/literals.js\");\n/* harmony import */ var _base_oid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../base/oid */ \"./src/base/oid.js\");\n/* harmony import */ var _base_oid_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../base/oid-ui */ \"./src/base/oid-ui.js\");\n\n\n\n\nclass ConsoleOid extends _base_oid_ui__WEBPACK_IMPORTED_MODULE_2__.OidUI {\n  handleSend (topic, message) {\n    if (this._presentation && message.value)\n      this._presentation.value +=\n        (this.prompt.length > 0 ? `${this.prompt} ` : '') +\n      `${message.value}\\n`\n  }\n}\n\n_base_oid__WEBPACK_IMPORTED_MODULE_1__.Oid.component({\n  id: 'oid:console',\n  element: 'console-oid',\n  properties: {\n    label: {},\n    prompt: {default: '>'}\n  },\n  receive: {'display': 'handleSend'},\n  provide: ['itf:transfer'],\n  implementation: ConsoleOid,\n  styles: _infra_literals_js__WEBPACK_IMPORTED_MODULE_0__.css`\n  .console {\n    width: 97%;\n    font-family: \"Courier New\", monospace;\n    font-size: 1em;\n    background-color: lightgray\n  }`,\n  template: _infra_literals_js__WEBPACK_IMPORTED_MODULE_0__.html`\n  <textarea class=\"console\" rows=\"10\" id=\"oid-prs\" readonly></textarea>`\n})\n\n//# sourceURL=webpack://oidlib/./src/components/ui/console-oid.js?");

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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Bus\": () => (/* binding */ Bus)\n/* harmony export */ });\nclass Bus {\n  constructor() {\n    this._listeners = {}\n    this._listenersRgx = []\n    this._providers = {}\n    this._pendingCnx = {}\n  }\n\n  /* Message-oriented communication\n   ********************************/\n\n  subscribe (subscribed, handler) {\n    if (subscribed != null) {\n      let topics = {}\n      if (typeof subscribed === 'string' && handler != null)\n        topics[subscribed] = handler\n      else if (typeof subscribed === 'object')\n        topics = subscribed\n      const listenersRgx = this._listenersRgx.slice()\n      const listeners = { ...this._listeners }\n      for (const tp in topics) {\n        if (topics[tp] != null) {\n          // topic filter: transform wildcards in regular expressions\n          if (tp.includes('+') || tp.includes('#'))\n            listenersRgx.push([Bus._convertRegExp(tp), topics[tp], tp])\n          else {\n            if (listeners[tp] == null)\n              listeners[tp] = []\n            else\n              listeners[tp] = listeners[tp].slice() // clone\n            listeners[tp].push(topics[tp])\n          }\n        }\n      }\n      this._listenersRgx = listenersRgx\n      this._listeners = listeners\n    }\n  }\n\n  unsubscribe (subscribed) {\n    if (subscribed != null) {\n      const topics = {}\n      if (typeof subscribed === 'string' && handler != null)\n        topics[subscribed] = handler\n      else if (typeof subscribed === 'object')\n        topics = subscribed\n      const listenersRgx = this._listenersRgx.slice()\n      const listeners = { ...this._listeners }\n      for (const tp in topics) {\n        if (tp.includes('+') || tp.includes('#')) {\n          for (const l in listenersRgx) {\n            if (listenersRgx[l][1] === topics[tp] &&\n                listenersRgx[l][2] == tp) {\n              listenersRgx.splice(l, 1)\n              break\n            }\n          }\n        } else if (listeners[tp] != null) {\n          for (const l in listeners[tp]) {\n            if (listeners[tp][l] === topics[tp]) {\n              listeners[tp] = listeners[tp].toSplice(l, 1) // clone\n              break\n            }\n          }\n        }\n      }\n      this._listenersRgx = listenersRgx\n      this._listeners = listeners\n    }\n  }\n\n  async publish (topic, message) {\n    if (this._listeners[topic] != null)\n      for (const handler of this._listeners[topic])\n        handler(topic, message)\n    const listenersRgx = this._listenersRgx\n    for (const l of listenersRgx) {\n      const match = l[0].exec(topic)\n      if (match != null && match[0] === topic)\n        l[1](topic, message)\n    }\n  }\n\n  /* Message analysis services\n     *************************/\n\n  static _convertRegExp (filter) {\n    return new RegExp(filter.replace(/\\//g, '\\\\/')\n      .replace(/\\+/g, '[^\\/]+')\n      .replace(/#/g, '.+'))\n  }\n\n  /* Connection-oriented communication\n   ***********************************/\n\n  /*\n   * Components declare provided services. Each interface defines a type of\n   *  service. The same component can have several interfaces/services:\n   *   cInterface: interface provided by the component\n   *   id: unique id of the component instance that offers the service\n   *   provider: the component or component subobject that implements\n   *             the interface/service\n   */\n  provide (cInterface, id, provider) {\n    let status = false\n    if (id != null && cInterface != null && provider != null) {\n      const key = cInterface + '#' + id\n      if (this._providers[key] == null) {\n        status = true\n        this._providers[key] = provider\n        if (this._pendingCnx[key] != null) {\n          for (let c of this._pendingCnx[key])\n            c.connectionReady(cInterface, id, provider)\n          delete this._pendingCnx[key]\n        }\n      }\n    }\n    return status\n  }\n\n  /*\n   * Removes a provided service (usually, when the component is destroyed)\n   */\n  withhold (cInterface, id) {\n    let status = false\n    if (id != null && cInterface != null) {\n      const key = cInterface + '#' + id\n      if (this._providers[key]) {\n        status = true\n        delete this._providers[key]\n      }\n    }\n    return status\n  }\n\n  /*\n   * Connects a component to another one based on the id and a provided service.\n   *   id: id of the component that offers the service\n   *   cInterface: label related to the provided interface\n   *   callback: component that will be notified as soon as the interface is\n   *             connected\n   */\n  connect (cInterface, id, callback) {\n    let status = false\n    if (id != null && cInterface != null && callback != null) {\n      const key = cInterface + '#' + id\n      if (this._providers[key])\n        callback.connectionReady(cInterface, id, this._providers[key])\n        // callback.connectionReady(cInterface, id,\n        //     this.invoke.bind(this, key), this._providers[key])\n      else\n        if (this._pendingCnx[key])\n          this._pendingCnx[key].push(callback)\n        else\n          this._pendingCnx[key] = [callback]\n    }\n  }\n\n  /*\n   * Triggers a interface defined by an id and component, sending an optional\n   * message to it.\n   */\n  async invoke (cInterface, id, notice, message) {\n    // console.log('=== bus invoke', cInterface, id, notice, message)\n    // console.log(this._providers)\n    const key = cInterface + '#' + id\n    if (this._providers[key] != null)\n      return await\n        this._providers[key].handleInvoke(cInterface, notice, message)\n    else\n      return null\n  }\n}\n\nBus.i = new Bus()\n\n//# sourceURL=webpack://oidlib/./src/infra/bus.js?");

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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Bus\": () => (/* reexport safe */ _infra_bus_js__WEBPACK_IMPORTED_MODULE_1__.Bus),\n/* harmony export */   \"ButtonOid\": () => (/* reexport safe */ _components_ui_button_oid_js__WEBPACK_IMPORTED_MODULE_10__.ButtonOid),\n/* harmony export */   \"ConsoleOid\": () => (/* reexport safe */ _components_ui_console_oid_js__WEBPACK_IMPORTED_MODULE_12__.ConsoleOid),\n/* harmony export */   \"FileOid\": () => (/* reexport safe */ _components_data_file_oid_js__WEBPACK_IMPORTED_MODULE_9__.FileOid),\n/* harmony export */   \"Oid\": () => (/* reexport safe */ _base_oid_js__WEBPACK_IMPORTED_MODULE_3__.Oid),\n/* harmony export */   \"OidBase\": () => (/* reexport safe */ _base_oid_base_js__WEBPACK_IMPORTED_MODULE_4__.OidBase),\n/* harmony export */   \"OidUI\": () => (/* reexport safe */ _base_oid_ui_js__WEBPACK_IMPORTED_MODULE_6__.OidUI),\n/* harmony export */   \"OidWeb\": () => (/* reexport safe */ _base_oid_web_js__WEBPACK_IMPORTED_MODULE_5__.OidWeb),\n/* harmony export */   \"Primitive\": () => (/* reexport safe */ _base_primitive_js__WEBPACK_IMPORTED_MODULE_2__.Primitive),\n/* harmony export */   \"SwitchOid\": () => (/* reexport safe */ _components_ui_switch_input_oid_js__WEBPACK_IMPORTED_MODULE_11__.SwitchOid),\n/* harmony export */   \"css\": () => (/* reexport safe */ _infra_literals_js__WEBPACK_IMPORTED_MODULE_0__.css),\n/* harmony export */   \"html\": () => (/* reexport safe */ _infra_literals_js__WEBPACK_IMPORTED_MODULE_0__.html)\n/* harmony export */ });\n/* harmony import */ var _infra_literals_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../infra/literals.js */ \"./src/infra/literals.js\");\n/* harmony import */ var _infra_bus_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../infra/bus.js */ \"./src/infra/bus.js\");\n/* harmony import */ var _base_primitive_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../base/primitive.js */ \"./src/base/primitive.js\");\n/* harmony import */ var _base_oid_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../base/oid.js */ \"./src/base/oid.js\");\n/* harmony import */ var _base_oid_base_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../base/oid-base.js */ \"./src/base/oid-base.js\");\n/* harmony import */ var _base_oid_web_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../base/oid-web.js */ \"./src/base/oid-web.js\");\n/* harmony import */ var _base_oid_ui_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../base/oid-ui.js */ \"./src/base/oid-ui.js\");\n/* harmony import */ var _base_interfaces_base_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../base/interfaces-base.js */ \"./src/base/interfaces-base.js\");\n/* harmony import */ var _components_interfaces_components_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../components/interfaces-components.js */ \"./src/components/interfaces-components.js\");\n/* harmony import */ var _components_data_file_oid_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../components/data/file-oid.js */ \"./src/components/data/file-oid.js\");\n/* harmony import */ var _components_ui_button_oid_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../components/ui/button-oid.js */ \"./src/components/ui/button-oid.js\");\n/* harmony import */ var _components_ui_switch_input_oid_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../components/ui/switch-input-oid.js */ \"./src/components/ui/switch-input-oid.js\");\n/* harmony import */ var _components_ui_console_oid_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../components/ui/console-oid.js */ \"./src/components/ui/console-oid.js\");\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n//# sourceURL=webpack://oidlib/./src/lib/index.js?");

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