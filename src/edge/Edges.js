// Export a default class named ReactiveObject
export default class ReactiveObjects {
  #content = [];
  #subscribers = {};

  constructor() {}

  create(obj) {
    const id = 'id'+Math.random().toString(36).substring(2);
    const version = 1;
    const operation = 'id'+Math.random().toString(36).substring(2);
    const deleted = false;
    const newObj = {id, version, operation, deleted, ...obj };
    this.#content.push(newObj);
    this.#notify('created', {...newObj});
    return newObj;
  }

  remove(id) {
    const obj = this.#content.find(obj => obj.id === id);
    if (obj) {
      obj.deleted = true;
      this.#notify('removed', {...obj});
    }
  }

  removeDeleted(id) {
    this.#content = this.#content.filter(obj => !obj.deleted);
  }

  update(id, property, value) {
    const obj = this.#content.find(obj => obj.id === id);
    if (obj && obj[property] !== value) {
      obj.version = obj.version + 1;
      obj.operation = 'id'+Math.random().toString(36).substring(2);
      obj[property] = value;
      this.#notify('updated', {...obj});
    }
  }

  #notify(type, data) {
    Object.values(this.#subscribers).forEach(callback => callback(type, data));
  }

  subscribe(callback) {
    const id = Math.random().toString(36).substring(2);
    this.#subscribers[id] = callback;
    return () => this.unsubscribe(id);
  }

  unsubscribe(id) {
    delete this.#subscribers[id];
  }
}
