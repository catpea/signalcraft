(() => {
  // src/react/ReactiveArray.js
  var ReactiveArray = class {
    #application;
    #content = [];
    constructor(application) {
      this.#application = application;
    }
    size() {
      return this.#content.filter((item) => !item.deleted).length;
    }
    forEach(callback) {
      this.#content.filter((item) => !item.deleted).forEach(callback);
    }
    create(...argv) {
      const item = this.instantiate(...argv);
      this.#content.push(item);
      item.application = this.#application;
      if (item.start)
        item.start();
      this.#notify("created", { item });
      return item;
    }
    remove(id) {
      const item = this.#content.find((item2) => item2.id === id);
      if (item) {
        if (item.stop)
          item.stop();
        item.deleted = true;
        this.#notify("removed", { item });
      }
    }
    removeDeleted() {
      this.#content = this.#content.filter((item) => !item.deleted);
    }
    find(id) {
      return this.#content.find((item) => item.id === id);
    }
    update(id, property, value) {
      const item = this.#content.find((item2) => item2.id === id);
      if (item && item[property] !== value) {
        const old = item[property];
        item[property] = value;
        this.#notify("updated", { item, property, value, old });
      }
    }
    #observers = {};
    #notify(eventName, eventData) {
      if (Array.isArray(this.#observers[eventName]))
        this.#observers[eventName].forEach((observer) => observer(eventData));
    }
    observe(eventName, observer) {
      this.subscribe(eventName, observer);
      observer({ data: this.#content });
    }
    subscribe(eventName, observer) {
      if (typeof observer !== "function")
        throw new TypeError("Observer must be a function.");
      if (!Array.isArray(this.#observers[eventName]))
        this.#observers[eventName] = [];
      this.#observers[eventName].push(observer);
      return () => {
        this.#unsubscribe(eventName, observer);
      };
    }
    #unsubscribe(eventName, observer) {
      this.#observers[eventName] = this.#observers[eventName].filter(
        (obs) => obs !== observer
      );
    }
    // USER INTERFACE
    instantiate() {
    }
  };

  // src/react/ReactiveObject.js
  var ReactiveObject = class {
    #monitors = {};
    #observers = {};
    #state = {};
    defineReactiveProperty(key, val) {
      this.#state[key] = val;
      Object.defineProperty(this, key, {
        get: () => this.#state[key],
        set: (newValue) => {
          const oldValue = this.#state[key];
          if (newValue === oldValue)
            return;
          this.#state[key] = newValue;
          this.#notifyObservers(key, newValue, oldValue);
          this.#notifyMonitors(key, newValue, oldValue);
        }
      });
    }
    #notifyObservers(key, value) {
      if (Array.isArray(this.#observers[key]))
        this.#observers[key].forEach((observer) => observer(value));
    }
    #notifyMonitors(key, value) {
      Object.values(this.#monitors).forEach((callback) => callback(key, value, this));
    }
    monitor(observer) {
      const id = Math.random().toString(36).substring(2);
      this.#monitors[id] = observer;
      return () => {
        delete this.#monitors[id];
      };
    }
    observe(key, observer) {
      this.subscribe(key, observer);
      observer(this[key]);
    }
    subscribe(key, observer) {
      if (typeof observer !== "function")
        throw new TypeError("Observer must be a function.");
      if (!Array.isArray(this.#observers[key]))
        this.#observers[key] = [];
      this.#observers[key].push(observer);
      const value = this[key];
      return () => {
        this.#unsubscribe(key, observer);
      };
    }
    #unsubscribe(key, observer) {
      this.#observers[key] = this.#observers[key].filter((obs) => obs !== observer);
    }
  };

  // src/dream/DreamInterface.js
  var DreamInterface = class {
    brain;
    constructor(brain2) {
      this.brain = brain2;
    }
    addNode(type) {
      return this.brain.Nodes.create({ type });
    }
    linkPorts(sourceNode, targetNode, options = { reply: "reply", input: "input" }) {
      const { reply: replyPort, input: inputPort } = options;
      return this.brain.Edges.create({ sourceNode, targetNode, replyPort, inputPort });
    }
    async run(node) {
      if (!node)
        throw new Error("you must specify which node to run");
      const output = await node.output();
      console.log(`Output of node ${node.id}`, output);
      return output;
    }
  };

  // src/theme/Box.js
  var Box = class _Box {
    children = [];
    parent;
    x = 0;
    y = 0;
    constructor({ w = 0, h = 0, padding = 5 } = {}) {
      this.width = w;
      this.height = h;
      this.padding = padding;
    }
    append(box) {
      box.parent = this;
      this.children.push(box);
    }
    get totalPadding() {
      return this.padding * (this.children.length + 1);
    }
    finalCalculate(y = 0) {
      let cumulativeHeight = y + this.padding;
      this.y = cumulativeHeight;
      this.children.forEach((child) => {
        child.finalCalculate(cumulativeHeight);
        cumulativeHeight += child.totalHeight;
      });
    }
    get totalHeight() {
      let childrenHeight = this.children.reduce((total, childBox) => total + (childBox.totalHeight || 0), 0);
      return (this.height || 0) + this.totalPadding + childrenHeight;
    }
    fill(times, conf) {
      for (let i = 0; i < times; i++) {
        this.append(new _Box(conf));
      }
      return this;
    }
  };

  // src/theme/MightyMidnight.js
  var MidnightTheme = class {
    captionHeight = 48;
    lineHeight = 32;
    gapHeight = 5;
    padding = 5;
    margin = 5;
    getNodeHeightFor(node) {
      const main = new Box({ w: 300 });
      const caption = new Box({ h: this.captionHeight });
      const inputs = new Box();
      const outputs = new Box();
      main.append(caption);
      main.append(outputs);
      main.append(inputs);
      inputs.fill(node.Incoming.size(), { h: this.lineHeight });
      outputs.fill(node.Outgoing.size(), { h: this.lineHeight });
      main.finalCalculate();
      return {
        height: main.totalHeight,
        inputs: inputs.children.map((o) => o.y),
        outputs: outputs.children.map((o) => o.y)
      };
    }
  };

  // src/brain/Brain.js
  var Brain = class extends ReactiveObject {
    Dream;
    Theme;
    Types;
    Views;
    Setup;
    Nodes;
    Edges;
    constructor() {
      super();
      this.Dream = new DreamInterface(this);
      this.Theme = new MidnightTheme(this);
      this.Types = new ReactiveArray({ root: this, class: Type });
      this.Views = new ReactiveArray({ root: this, class: View });
      this.Nodes = new ReactiveArray({ root: this, class: Node });
      this.Edges = new ReactiveArray({ root: this, class: Edge });
      this.Setup = new ReactiveObject(this, { fgColor: "blue", bgColor: "green" });
    }
    async start() {
      console.log("Starting...");
      this.Setup.bgColor = `url(#background-secondary)`;
      let intervalID = setInterval(() => {
      }, 1e3);
    }
    async stop() {
    }
    integrate(that, map) {
      for (const key in map) {
        if (map.hasOwnProperty(key)) {
          const [objectName, eventName, fluff] = key.split(" ");
          const handlerFunction = map[key];
          switch (objectName) {
            case "Setup":
              this.Setup.subscribe(eventName, handlerFunction.bind(that));
              break;
            case "Nodes":
              this.Nodes.subscribe(eventName, handlerFunction.bind(that));
              break;
            case "Edges":
              this.Edges.subscribe(eventName, handlerFunction.bind(that));
              break;
            default:
          }
        }
      }
    }
  };

  // src/tasks/registerTypes.js
  function registerTypes_default(core) {
    const textType = core.Types.create("text", "string");
    textType.Reply.create({ name: "output", generator: () => {
      return this.string;
    } });
    textType.Input.create({ name: "string", type: "string", description: "a string of letters" });
    const colorType = core.Types.create("text", "color");
    colorType.Reply.create({ name: "output", generator: () => {
      return this.color;
    } });
    colorType.Input.create({ name: "color", type: "string", description: "color" });
    colorType.Input.create({ name: "model", type: "string", description: "preferred model" });
    colorType.Input.create({ name: "description", type: "string", description: "description" });
    const uppercaseType = core.Types.create("text", "case");
    uppercaseType.Reply.create({ name: "upper", generator: () => {
      return this.input.toUpperCase();
    } });
    uppercaseType.Reply.create({ name: "lower", generator: () => {
      return this.input.toLowerCase();
    } });
    uppercaseType.Input.create({ name: "input" });
    uppercaseType.Input.create({ name: "template", type: "string", description: "string template use $input to interpolate" });
    uppercaseType.Input.create({ name: "description", type: "string", description: "description" });
    const arrayJoinType = core.Types.create("array", "join");
    arrayJoinType.Reply.create({ name: "output", generator: ({ array, separator }) => {
      return array.join(separator);
    } });
    arrayJoinType.Input.create({ name: "input", type: "*", description: "data to join" });
    arrayJoinType.Input.create({ name: "separator", type: "string", description: "separator to use" });
    arrayJoinType.Input.create({ name: "duck", type: "string", description: "separator to use" });
  }

  // src/usage.js
  async function usage_default(app2) {
    const stringA = app2.addNode("text/string", { value: "a" });
    const stringB = app2.addNode("text/string", { value: "b" });
    const arrayJn = app2.addNode("array/join");
    app2.linkPorts(stringA, arrayJn);
    app2.linkPorts(stringB, arrayJn);
    const result = await app2.run(arrayJn);
    console.log("usage.js app.run said: ", result);
    const actual = JSON.stringify(result);
    const expect = JSON.stringify(["a", "b"]);
    console.assert(actual == expect, `./src/usage.js: Yay! the program failed to run correctly, expected ${expect} but got "${actual}" instead.`);
  }

  // src/craft.js
  var brain = new Brain();
  globalThis.signalcraft = brain;
  registerTypes_default(brain);
  brain.Views.create("view-1", document.querySelector(".signalcraft-view-1"));
  brain.Views.create("view-2", document.querySelector(".signalcraft-view-2"));
  brain.start();
  var app = brain.Dream;
  usage_default(app);
})();
