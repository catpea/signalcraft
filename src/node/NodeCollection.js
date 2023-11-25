import NodeRegistry from "./helper/NodeRegistry.js";
import TextNode from "./types/TextNode.js";
import FunctionNode from "./types/FunctionNode.js";
import ColorNode from "./types/ColorNode.js";

// Export a default class named ReactiveObject
export default class NodeCollection {
  #content = [];
  #registry = new NodeRegistry();

  constructor() {
    this.#registry.register("text", TextNode);
    this.#registry.register("color", ColorNode);
    this.#registry.register("function", FunctionNode);
  }

  forEach(callback){
    this.#content.forEach(callback);
  }


  create(...arg) {
    const node = this.#registry.create(...arg);
    this.#content.push(node);
    this.#notify("created", {node});
    return node;
  }

  remove(id) {
    const node = this.#content.find((node) => node.id === id);
    if (node) {
      node.deleted = true;
      this.#notify("removed", {node});
    }
  }

  removeDeleted() {
    this.#content = this.#content.filter((node) => !node.deleted);
  }

  update(id, property, value) {
    const node = this.#content.find((node) => node.id === id);
    if (node && node[property] !== value) {
      const old = node[property];
      node[property] = value;
      this.#notify("updated", {node, property, value, old} );
    }
  }






  #observers = {};
  #notify(eventName, eventData) {
    if (Array.isArray(this.#observers[eventName])) this.#observers[eventName].forEach((observer) => observer( eventData ));
  }
  subscribe(eventName, observer) {
    // Ensure that observer is a function
    if (typeof observer !== "function")
      throw new TypeError("Observer must be a function.");
    // If there isn't an observers array for this key yet, create it
    if (!Array.isArray(this.#observers[eventName])) this.#observers[eventName] = [];
    this.#observers[eventName].push(observer);
    // Return a function to unsubscribe this observer.
    return () => {
      this.#unsubscribe(eventName, observer);
    };
  }
  #unsubscribe(eventName, observer) {
    this.#observers[eventName] = this.#observers[eventName].filter(
      (obs) => obs !== observer
    );
  }
}
