(() => {
  // node_modules/jsx-dom/index.js
  var keys = Object.keys;
  function isBoolean(val) {
    return typeof val === "boolean";
  }
  function isElement(val) {
    return val && typeof val.nodeType === "number";
  }
  function isString(val) {
    return typeof val === "string";
  }
  function isNumber(val) {
    return typeof val === "number";
  }
  function isObject(val) {
    return typeof val === "object" ? val !== null : isFunction(val);
  }
  function isFunction(val) {
    return typeof val === "function";
  }
  function isComponentClass(Component2) {
    const { prototype } = Component2;
    return !!(prototype && prototype.isReactComponent);
  }
  function isArrayLike(obj) {
    return isObject(obj) && typeof obj.length === "number" && typeof obj.nodeType !== "number";
  }
  function forEach(value, fn) {
    if (!value)
      return;
    for (const key of keys(value)) {
      fn(value[key], key);
    }
  }
  function isRef(maybeRef) {
    return isObject(maybeRef) && "current" in maybeRef;
  }
  var isUnitlessNumber = {
    animationIterationCount: 0,
    borderImageOutset: 0,
    borderImageSlice: 0,
    borderImageWidth: 0,
    boxFlex: 0,
    boxFlexGroup: 0,
    boxOrdinalGroup: 0,
    columnCount: 0,
    columns: 0,
    flex: 0,
    flexGrow: 0,
    flexPositive: 0,
    flexShrink: 0,
    flexNegative: 0,
    flexOrder: 0,
    gridArea: 0,
    gridRow: 0,
    gridRowEnd: 0,
    gridRowSpan: 0,
    gridRowStart: 0,
    gridColumn: 0,
    gridColumnEnd: 0,
    gridColumnSpan: 0,
    gridColumnStart: 0,
    fontWeight: 0,
    lineClamp: 0,
    lineHeight: 0,
    opacity: 0,
    order: 0,
    orphans: 0,
    tabSize: 0,
    widows: 0,
    zIndex: 0,
    zoom: 0,
    // SVG-related properties
    fillOpacity: 0,
    floodOpacity: 0,
    stopOpacity: 0,
    strokeDasharray: 0,
    strokeDashoffset: 0,
    strokeMiterlimit: 0,
    strokeOpacity: 0,
    strokeWidth: 0
  };
  function prefixKey(prefix, key) {
    return prefix + key.charAt(0).toUpperCase() + key.substring(1);
  }
  var prefixes = ["Webkit", "ms", "Moz", "O"];
  keys(isUnitlessNumber).forEach((prop) => {
    prefixes.forEach((prefix) => {
      isUnitlessNumber[prefixKey(prefix, prop)] = 0;
    });
  });
  var jsxDomType = Symbol.for("jsx-dom:type");
  var JsxDomType = /* @__PURE__ */ function(JsxDomType2) {
    JsxDomType2["ShadowRoot"] = "ShadowRoot";
    return JsxDomType2;
  }(JsxDomType || {});
  function ShadowRoot(_ref) {
    let { children, ref, ...attr2 } = _ref;
    return {
      [jsxDomType]: JsxDomType.ShadowRoot,
      ref,
      attr: attr2,
      children
    };
  }
  function isShadowRoot(el) {
    return el != null && el[jsxDomType] === JsxDomType.ShadowRoot;
  }
  var SVGNamespace = "http://www.w3.org/2000/svg";
  var XLinkNamespace = "http://www.w3.org/1999/xlink";
  var XMLNamespace = "http://www.w3.org/XML/1998/namespace";
  function isVisibleChild(value) {
    return !isBoolean(value) && value != null;
  }
  var DomTokenList = typeof DOMTokenList !== "undefined" ? DOMTokenList : function() {
  };
  function className(value) {
    if (Array.isArray(value)) {
      return value.map(className).filter(Boolean).join(" ");
    } else if (value instanceof DomTokenList) {
      return "" + value;
    } else if (isObject(value)) {
      return keys(value).filter((k) => value[k]).join(" ");
    } else if (isVisibleChild(value)) {
      return "" + value;
    } else {
      return "";
    }
  }
  var svg = {
    animate: 0,
    circle: 0,
    clipPath: 0,
    defs: 0,
    desc: 0,
    ellipse: 0,
    feBlend: 0,
    feColorMatrix: 0,
    feComponentTransfer: 0,
    feComposite: 0,
    feConvolveMatrix: 0,
    feDiffuseLighting: 0,
    feDisplacementMap: 0,
    feDistantLight: 0,
    feFlood: 0,
    feFuncA: 0,
    feFuncB: 0,
    feFuncG: 0,
    feFuncR: 0,
    feGaussianBlur: 0,
    feImage: 0,
    feMerge: 0,
    feMergeNode: 0,
    feMorphology: 0,
    feOffset: 0,
    fePointLight: 0,
    feSpecularLighting: 0,
    feSpotLight: 0,
    feTile: 0,
    feTurbulence: 0,
    filter: 0,
    foreignObject: 0,
    g: 0,
    image: 0,
    line: 0,
    linearGradient: 0,
    marker: 0,
    mask: 0,
    metadata: 0,
    path: 0,
    pattern: 0,
    polygon: 0,
    polyline: 0,
    radialGradient: 0,
    rect: 0,
    stop: 0,
    svg: 0,
    switch: 0,
    symbol: 0,
    text: 0,
    textPath: 0,
    tspan: 0,
    use: 0,
    view: 0
  };
  var nonPresentationSVGAttributes = /^(a(ll|t|u)|base[FP]|c(al|lipPathU|on)|di|ed|ex|filter[RU]|g(lyphR|r)|ke|l(en|im)|ma(rker[HUW]|s)|n|pat|pr|point[^e]|re[^n]|s[puy]|st[^or]|ta|textL|vi|xC|y|z)/;
  function Fragment(attr2) {
    const fragment = document.createDocumentFragment();
    appendChild(attr2.children, fragment);
    return fragment;
  }
  var Component = class {
    constructor(props) {
      this.props = props;
    }
    render() {
      return null;
    }
  };
  /* @__PURE__ */ Object.defineProperties(Component.prototype, {
    isReactComponent: {
      value: true
    }
  });
  function initComponentClass(Class, attr2, children) {
    attr2 = {
      ...attr2,
      children
    };
    const instance = new Class(attr2);
    return instance.render();
  }
  function jsx(tag, _ref) {
    let { children, ...attr2 } = _ref;
    if (!attr2.namespaceURI && svg[tag] === 0) {
      attr2 = {
        ...attr2,
        namespaceURI: SVGNamespace
      };
    }
    let node;
    if (isString(tag)) {
      node = attr2.namespaceURI ? document.createElementNS(attr2.namespaceURI, tag) : document.createElement(tag);
      attributes(attr2, node);
      appendChild(children, node);
      if (node instanceof window.HTMLSelectElement && attr2.value != null) {
        if (attr2.multiple === true && Array.isArray(attr2.value)) {
          const values = attr2.value.map((value) => String(value));
          node.querySelectorAll("option").forEach((option) => option.selected = values.includes(option.value));
        } else {
          node.value = attr2.value;
        }
      }
      attachRef(attr2.ref, node);
    } else if (isFunction(tag)) {
      if (isObject(tag.defaultProps)) {
        attr2 = {
          ...tag.defaultProps,
          ...attr2
        };
      }
      node = isComponentClass(tag) ? initComponentClass(tag, attr2, children) : tag({
        ...attr2,
        children
      });
    } else {
      throw new TypeError(`Invalid JSX element type: ${tag}`);
    }
    return node;
  }
  function createElement(tag, attr2) {
    for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key2 = 2; _key2 < _len; _key2++) {
      children[_key2 - 2] = arguments[_key2];
    }
    if (isString(attr2) || Array.isArray(attr2)) {
      children.unshift(attr2);
      attr2 = {};
    }
    attr2 = attr2 || {};
    if (attr2.children != null && !children.length) {
      ;
      ({ children, ...attr2 } = attr2);
    }
    return jsx(
      tag,
      {
        ...attr2,
        children
      },
      attr2.key
    );
  }
  function attachRef(ref, node) {
    if (isRef(ref)) {
      ref.current = node;
    } else if (isFunction(ref)) {
      ref(node);
    }
  }
  function appendChild(child, node) {
    if (isArrayLike(child)) {
      appendChildren(child, node);
    } else if (isString(child) || isNumber(child)) {
      appendChildToNode(document.createTextNode(child), node);
    } else if (child === null) {
      appendChildToNode(document.createComment(""), node);
    } else if (isElement(child)) {
      appendChildToNode(child, node);
    } else if (isShadowRoot(child)) {
      const shadowRoot = node.attachShadow(child.attr);
      appendChild(child.children, shadowRoot);
      attachRef(child.ref, shadowRoot);
    }
  }
  function appendChildren(children, node) {
    for (const child of [...children]) {
      appendChild(child, node);
    }
    return node;
  }
  function appendChildToNode(child, node) {
    if (node instanceof window.HTMLTemplateElement) {
      node.content.appendChild(child);
    } else {
      node.appendChild(child);
    }
  }
  function normalizeAttribute(s, separator) {
    return s.replace(/[A-Z]/g, (match) => separator + match.toLowerCase());
  }
  function style(node, value) {
    if (value == null || value === false)
      ;
    else if (Array.isArray(value)) {
      value.forEach((v) => style(node, v));
    } else if (isString(value)) {
      node.setAttribute("style", value);
    } else if (isObject(value)) {
      forEach(value, (val, key) => {
        if (key.indexOf("-") === 0) {
          node.style.setProperty(key, val);
        } else if (isNumber(val) && isUnitlessNumber[key] !== 0) {
          node.style[key] = val + "px";
        } else {
          node.style[key] = val;
        }
      });
    }
  }
  function attribute(key, value, node) {
    switch (key) {
      case "xlinkActuate":
      case "xlinkArcrole":
      case "xlinkHref":
      case "xlinkRole":
      case "xlinkShow":
      case "xlinkTitle":
      case "xlinkType":
        attrNS(node, XLinkNamespace, normalizeAttribute(key, ":"), value);
        return;
      case "xmlnsXlink":
        attr(node, normalizeAttribute(key, ":"), value);
        return;
      case "xmlBase":
      case "xmlLang":
      case "xmlSpace":
        attrNS(node, XMLNamespace, normalizeAttribute(key, ":"), value);
        return;
    }
    switch (key) {
      case "htmlFor":
        attr(node, "for", value);
        return;
      case "dataset":
        forEach(value, (dataValue, dataKey) => {
          if (dataValue != null) {
            node.dataset[dataKey] = dataValue;
          }
        });
        return;
      case "innerHTML":
      case "innerText":
      case "textContent":
        if (isVisibleChild(value)) {
          node[key] = value;
        }
        return;
      case "dangerouslySetInnerHTML":
        if (isObject(value)) {
          node.innerHTML = value["__html"];
        }
        return;
      case "value":
        if (value == null || node instanceof window.HTMLSelectElement) {
          return;
        } else if (node instanceof window.HTMLTextAreaElement) {
          node.value = value;
          return;
        }
        break;
      case "spellCheck":
        node.spellcheck = value;
        return;
      case "class":
      case "className":
        if (isFunction(value)) {
          value(node);
        } else {
          attr(node, "class", className(value));
        }
        return;
      case "ref":
      case "namespaceURI":
        return;
      case "style":
        style(node, value);
        return;
      case "on":
      case "onCapture":
        forEach(value, (eventHandler, eventName) => {
          node.addEventListener(eventName, eventHandler, key === "onCapture");
        });
        return;
    }
    if (isFunction(value)) {
      if (key[0] === "o" && key[1] === "n") {
        let attribute2 = key.toLowerCase();
        const useCapture = attribute2.endsWith("capture");
        if (attribute2 === "ondoubleclick") {
          attribute2 = "ondblclick";
        } else if (useCapture && attribute2 === "ondoubleclickcapture") {
          attribute2 = "ondblclickcapture";
        }
        if (!useCapture && node[attribute2] === null) {
          node[attribute2] = value;
        } else if (useCapture) {
          node.addEventListener(attribute2.substring(2, attribute2.length - 7), value, true);
        } else {
          let eventName;
          if (attribute2 in window) {
            const standardEventName = attribute2.substring(2);
            eventName = standardEventName;
          } else {
            const customEventName = attribute2[2] + key.slice(3);
            eventName = customEventName;
          }
          node.addEventListener(eventName, value);
        }
      }
    } else if (isObject(value)) {
      node[key] = value;
    } else if (value === true) {
      attr(node, key, "");
    } else if (value !== false && value != null) {
      if (node instanceof SVGElement && !nonPresentationSVGAttributes.test(key)) {
        attr(node, normalizeAttribute(key, "-"), value);
      } else {
        attr(node, key, value);
      }
    }
  }
  function attr(node, key, value) {
    node.setAttribute(key, value);
  }
  function attrNS(node, namespace, key, value) {
    node.setAttributeNS(namespace, key, value);
  }
  function attributes(attr2, node) {
    for (const key of keys(attr2)) {
      attribute(key, attr2[key], node);
    }
    return node;
  }
  var index = {
    Component,
    PureComponent: Component,
    createElement,
    Fragment,
    ShadowRoot
  };

  // node_modules/uuid/dist/esm-browser/rng.js
  var getRandomValues;
  var rnds8 = new Uint8Array(16);
  function rng() {
    if (!getRandomValues) {
      getRandomValues = typeof crypto !== "undefined" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto);
      if (!getRandomValues) {
        throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
      }
    }
    return getRandomValues(rnds8);
  }

  // node_modules/uuid/dist/esm-browser/stringify.js
  var byteToHex = [];
  for (let i = 0; i < 256; ++i) {
    byteToHex.push((i + 256).toString(16).slice(1));
  }
  function unsafeStringify(arr, offset = 0) {
    return byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]];
  }

  // node_modules/uuid/dist/esm-browser/native.js
  var randomUUID = typeof crypto !== "undefined" && crypto.randomUUID && crypto.randomUUID.bind(crypto);
  var native_default = {
    randomUUID
  };

  // node_modules/uuid/dist/esm-browser/v4.js
  function v4(options, buf, offset) {
    if (native_default.randomUUID && !buf && !options) {
      return native_default.randomUUID();
    }
    options = options || {};
    const rnds = options.random || (options.rng || rng)();
    rnds[6] = rnds[6] & 15 | 64;
    rnds[8] = rnds[8] & 63 | 128;
    if (buf) {
      offset = offset || 0;
      for (let i = 0; i < 16; ++i) {
        buf[offset + i] = rnds[i];
      }
      return buf;
    }
    return unsafeStringify(rnds);
  }
  var v4_default = v4;

  // src/view/template.html
  var template_default = '<link href="./node_modules/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">\n\n<div class="bg-secondary rounded" style="overflow: hidden;">\n  Yup!\n  <slot></slot>\n  <svg xmlns="http://www.w3.org/2000/svg" style="border: 1px solid gold;">\n\n\n    <rect x="0" y="0" width="11000" height="8000" fill="silver"/>\n    <circle cx="150" cy="150" r="50" />\n    <circle cx="250" cy="250" r="50" />\n\n    <g id="myNode"   transform="translate(10,10)">\n       <!-- Node Body -->\n       <rect class="interactive" width="180" height="80" ry="5" fill="#555"/>\n\n       <!-- Node Title -->\n       <text class="interactive" x="90" y="25" font-size="12px" fill="#fff" text-anchor="middle" font-weight="bold" font-family="Arial">Geometry</text>\n\n       <!-- Input Connector -->\n       <circle class="interactive" cx="0" cy="50" r="5" fill="cyan"/>\n       <text class="interactive" x="10" y="55" font-size="10px" fill="#fff" font-family="Arial">Geometry</text>\n\n       <!-- Output Connector -->\n       <circle class="interactive" cx="180" cy="50" r="5" fill="magenta"/>\n\n       <!-- <foreignObject   x="0" y="60" width="180" height="160">\n \n     In the context of SVG embedded in an HTML document, the XHTML\n     namespace could be omitted, but it is mandatory in the\n     context of an SVG document\n\n   <div class="interactive m-1" xmlns="http://www.w3.org/1999/xhtml">\n\n\n    <div class="dropdown">\n       <button class="btn btn-primary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">\n         Dropdown\n       </button>\n       <ul class="dropdown-menu">\n         <li><button class="dropdown-item btn btn-sm" type="button">Dropdown item</button></li>\n         <li><button class="dropdown-item btn btn-sm" type="button">Dropdown item</button></li>\n         <li><button class="dropdown-item btn btn-sm" type="button">Dropdown item</button></li>\n       </ul>\n     </div>\n\n       <label for="customRange1" class="form-label interactive">Example range</label>\n       <input type="range" class="form-range  " id="customRange1">\n\n\n     </div>\n\n\n </foreignObject> -->\n     </g>\n\n  </svg>\n</div>\n';

  // src/view/signalcraft-view.js
  var BasicNode = class {
    type = "basic";
    w = 200;
    x = 0;
    y = 0;
    colors = [];
    constructor() {
      this.colors = new Array(5).fill(0, 0, 5).map((o) => `hsl(${Math.random() * 360}, 20%, 35%)`);
      console.log(this.colors);
    }
  };
  var Node = class extends BasicNode {
    id = null;
    name = "Holla!";
    constructor() {
      super();
      this.id = v4_default();
      this.x = Math.random() * 11e3;
      this.y = Math.random() * 8e3;
    }
  };
  var View = class extends HTMLElement {
    #rootElement;
    #svgElement;
    #viewBox;
    #pan;
    constructor() {
      super();
      const div1 = document.createElement("div");
      this.shadowRootX = this.appendChild(div1);
    }
    connectedCallback() {
      this.#setup();
    }
    async #setup() {
      await this.#templateInitialization();
      await this.#installPanAndZoom();
      await this.#injectNodes();
      await this.#monitorDatabase();
    }
    async #templateInitialization() {
      const template = document.createElement("template");
      template.innerHTML = template_default;
      const documentFragment = this.shadowRootX.appendChild(
        template.content.cloneNode(true)
      );
      this.#rootElement = this.shadowRootX.firstChild;
      this.#svgElement = this.shadowRootX.querySelector("svg");
    }
    async #installPanAndZoom() {
      this.#svgElement.setAttribute("viewBox", `0 0 555 555`);
      const aspectRatio = this.#svgElement.width.baseVal.value / this.#svgElement.height.baseVal.value;
      this.#viewBox = { x: 0, y: 0, width: 555, height: 555 / aspectRatio };
      this.#pan = { enabled: false, start: { x: 0, y: 0 } };
      this.#svgElement.addEventListener("mousedown", (event2) => {
        const isInteractive = event2.target.classList.contains("interactive");
        console.log(event2.target, { isInteractive });
        if (isInteractive)
          return;
        this.#pan.enabled = true;
        this.#pan.start.x = event2.clientX;
        this.#pan.start.y = event2.clientY;
      });
      this.#svgElement.addEventListener("mousemove", (event2) => {
        if (!this.#pan.enabled)
          return;
        var scaleX = this.#viewBox.width / this.#svgElement.clientWidth;
        var scaleY = this.#viewBox.height / this.#svgElement.clientHeight;
        this.#viewBox.x += (this.#pan.start.x - event2.clientX) * scaleX;
        this.#viewBox.y += (this.#pan.start.y - event2.clientY) * scaleY;
        this.#pan.start.x = event2.clientX;
        this.#pan.start.y = event2.clientY;
        this.#svgElement.setAttribute(
          "viewBox",
          `${this.#viewBox.x} ${this.#viewBox.y} ${this.#viewBox.width} ${this.#viewBox.height}`
        );
      });
      this.#svgElement.addEventListener("mouseup", (event2) => {
        this.#pan.enabled = false;
      });
      this.#svgElement.addEventListener("wheel", (event2) => {
        event2.preventDefault();
        var scale = Math.pow(1.1, event2.deltaY > 0 ? 1 : -1);
        this.#viewBox.width *= scale;
        this.#viewBox.height *= scale;
        this.#svgElement.setAttribute(
          "viewBox",
          `${this.#viewBox.x} ${this.#viewBox.y} ${this.#viewBox.width} ${this.#viewBox.height}`
        );
      });
    }
    async #monitorDatabase() {
      console.log("Awaiting db... ... ...");
      const db = await globalThis.signalcraftDatabase;
      const updateNode = (o) => {
      };
      const appendNode = (o) => {
        this.#svgElement.appendChild(
          /* @__PURE__ */ index.createElement("g", { id: o.id, transform: `translate(${o.x},${o.y})` }, /* @__PURE__ */ index.createElement("rect", { class: "interactive", width: o.w, height: "80", ry: "5", fill: o.colors[0] }), /* @__PURE__ */ index.createElement("text", { class: "interactive", x: "90", y: "25", "font-size": "12px", fill: "#fff", "text-anchor": "middle", "font-weight": "bold", "font-family": "Arial" }, "Geometry"), /* @__PURE__ */ index.createElement("circle", { class: "interactive", cx: "0", cy: "50", r: "5", fill: "cyan" }), /* @__PURE__ */ index.createElement("text", { class: "interactive", x: "10", y: "55", "font-size": "10px", fill: "#fff", "font-family": "Arial" }, "Geometry"), /* @__PURE__ */ index.createElement("circle", { class: "interactive", cx: o.w, cy: "50", r: "5", fill: "magenta" }))
        );
      };
      db.todos.subscribe((list) => {
        const newItems = list.filter(
          (o) => !this.#svgElement.getElementById(o.id)
        );
        const oldItems = list.filter(
          (o) => this.#svgElement.getElementById(o.id)
        );
        console.log(
          "Currently have " + newItems.length + " new items and " + oldItems.length + " old ones."
        );
        newItems.forEach((item) => appendNode(item));
        oldItems.forEach((item) => updateNode(item));
      });
      let counter = 0;
      let intervalID = setInterval(() => {
        db.todos.push(new Node());
        if (counter > 1e3)
          clearInterval(intervalID);
        counter++;
      }, 1);
    }
    async #injectNodes() {
      var node = this.#svgElement.getElementById("myNode");
      var drag = {
        enabled: false,
        transform: { x: 10, y: 10 },
        start: { x: 0, y: 0 }
      };
      node.addEventListener("mousedown", (event2) => {
        event2.preventDefault();
        drag.enabled = true;
        var scaleX = this.#viewBox.width / this.#svgElement.clientWidth;
        var scaleY = this.#viewBox.height / this.#svgElement.clientHeight;
        drag.start.x = event2.clientX * scaleX - drag.transform.x;
        drag.start.y = event2.clientY * scaleY - drag.transform.y;
      });
      window.addEventListener("mousemove", (event2) => {
        event2.preventDefault();
        if (!drag.enabled)
          return;
        var scaleX = this.#viewBox.width / this.#svgElement.clientWidth;
        var scaleY = this.#viewBox.height / this.#svgElement.clientHeight;
        drag.transform.x = event2.clientX * scaleX - drag.start.x;
        drag.transform.y = event2.clientY * scaleY - drag.start.y;
        node.setAttribute(
          "transform",
          `translate(${drag.transform.x},${drag.transform.y})`
        );
      });
      window.addEventListener("mouseup", () => {
        event.preventDefault();
        drag.enabled = false;
      });
    }
  };
  customElements.define("sc-view", View);
})();
