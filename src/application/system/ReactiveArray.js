
export default class ReactiveArray {
  #auto; // auto call .start() on all items
  #application;
  #parent;
  #Item = [];
  #content = [];

  constructor({application, parent, Item, boot}) {
    if (!application) throw new TypeError("application is required");
    if (!Item) throw new TypeError("Item is required");
    this.#auto = !!auto;
    this.#application = application; // application is mandatory, evytrhing need to link back to the source for convenience
    this.#parent = parent; // parent is optional but it allows for trees
    this.#Item = Item;
  }

  [Symbol.iterator]() {
     return this.#content;
  }

  size(){
    return this.#content.filter(item=>!item.deleted).length;
  }

  forEach(callback) {
    this.#content.filter((item) => !item.deleted).forEach(callback);
  }

  create(...argv) {
    const item = new this.#Item({...arg, application:this.#application});
    this.#content.push(item);

    if (this.#auto && item.start) item.start();

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

  find(callback) {
    if (typeof callback !== "function") throw new TypeError("Find needs a function.");
    return this.#content.find(callback);
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


  observe(eventName, observer) { // triggers asap
    this.subscribe(eventName, observer);
    observer({data: this.#content});
  }

  subscribe(eventName, observer) {
    // Ensure that observer is a function
    if (typeof observer !== "function") throw new TypeError("Observer must be a function.");
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













  // Lifecycle

  start(auto=true) {
    this.#auto = auto; // start all from now on
    this.#content
      .filter((item) => !item.deleted)
      .forEach(item=>item.start());
  }

  stop(auto=false) {
    this.#auto = auto; // do not autostart
    this.#content
      .filter((item) => !item.deleted)
      .forEach(item=>item.stop());
  }

}
