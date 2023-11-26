import cloneDeep from 'lodash/cloneDeep';

export default class SimpleCollection {
  #application;
  #content = [];

  constructor(application) {
    this.#application = application;
  }

  size(){
    return this.#content.filter(item=>!item.deleted).length;
  }

  import(data){
    this.#content = data;
  }

  export(){
    return cloneDeep(this.#content)
  }

  forEach(callback) {
    this.#content.filter((item) => !item.deleted).forEach(callback);
  }

  create(...argv) {
    const item = this.instantiate(...argv);
    this.#content.push(item);
    item.application = this.#application;
    if (item.start) item.start();
    this.#notify("created", { item });
    return item;
  }

  remove(id) {
    const item = this.#content.find((item) => item.id === id);
    if (item) {
      if (item.stop) item.stop();
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
    const item = this.#content.find((item) => item.id === id);
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
  subscribe(eventName, observer) {
    // Ensure that observer is a function
    if (typeof observer !== "function")
      throw new TypeError("Observer must be a function.");
    // If there isn't an observers array for this key yet, create it
    if (!Array.isArray(this.#observers[eventName]))
      this.#observers[eventName] = [];
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

  // USER INTERFACE
  instantiate() {}
}
