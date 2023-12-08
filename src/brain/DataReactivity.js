export default class ApplicationReactivity {
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
}
