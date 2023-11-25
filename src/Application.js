import ReactiveObject from "./library/ReactiveObject.js";
import NodeCollection from "./node/NodeCollection.js";
// import EdgeCollection from "./node/EdgeCollection.js";

export default class SignalcraftCore {
  #nodes = new NodeCollection();
  // #edges = new EdgeCollection();
  #setup = new ReactiveObject({ fgColor: "blue", bgColor: "green" });

  constructor() {

    let intervalID = setInterval(() => {
      this.#setup.bgColor = `hsl(${ parseInt(Math.random() * 360) }, 20%, 35%)`;
      this.createNode("color");

    }, 10_000);

  }

  async ready() {}
  async start() {}
  async stop() {}

  get nodes(){
    return this.#nodes;
  }

  createNode(...arg) {
    this.#nodes.create(...arg);
  }
  removeNode() {}
  linkNodes() {}
  unlinkNodes() {}

  #subscribers = {};
  #notify(type, data) {
    Object.values(this.#subscribers).forEach((callback) =>
      callback(type, data)
    );
  }

  subscribe(callback) {
    const id = Math.random().toString(36).substring(2);
    this.#subscribers[id] = callback;
    return () => this.unsubscribe(id);
  }
  unsubscribe(id) {
    delete this.#subscribers[id];
  }

  integrate(that, map) {
    for (const key in map) {
      if (map.hasOwnProperty(key)) {
        const [objectName, eventName, fluff] = key.split(" ");
        const handlerFunction = map[key];
        switch (objectName) {
          case "setup":
            this.#setup.subscribe(eventName, handlerFunction.bind(that) );
            break;
          case "nodes":
            this.#nodes.subscribe(eventName, handlerFunction.bind(that) );
            break;
          case "edges":
            //this.#setup.subscribe(eventName, handlerFunction.bind(that));
            break;
          default:
        }
      }
    }
  }
}
