export default class ReactiveObject {
  #monitors = {};
  #observers = {};
  #state = {};

  defineReactiveProperty(key, val) {
    this.#state[key] = val;

      Object.defineProperty(this, key, {
          get: () => this.#state[key],
          set: (newValue) => {
            const oldValue = this.#state[key];
            if (newValue === oldValue) return; // this is on purpose we do nothing when the values are the sane (MEMOIZE/optimize)
            this.#state[key] = newValue;
            this.#notifyObservers(key, newValue, oldValue);
            this.#notifyMonitors(key, newValue, oldValue);
          }
      });
  }

  get content(){
    return this.#state;
  }

  #notifyObservers(key, value) {
      // if (Array.isArray(this.#observers[key])) this.#observers[key].forEach(observer =>  console.log(`observer notify of ${key}: "${value}" (${this.#observers[key].length})`));
      if (Array.isArray(this.#observers[key])) this.#observers[key].forEach(observer => observer(value));
  }

  #notifyMonitors(key, value) {

    Object.values(this.#monitors).forEach(callback => callback(key, value, this));

  }

  monitor(observer) {
    const id = Math.random().toString(36).substring(2);
    this.#monitors[id] = observer;
    return () => {delete this.#monitors[id]};
  }

  observe(key, observer, autorun=true) { // triggers asap
    // console.log('OBSERVE', key);
    if(autorun) observer(this[key]);
    return this.subscribe(key, observer);
  }

  subscribe(key, observer) {
      // Ensure that observer is a function
      if(typeof observer !== 'function') throw new TypeError('Observer must be a function.');
      // If there isn't an observers array for this key yet, create it
      if(!Array.isArray(this.#observers[key])) this.#observers[key] = [];
      this.#observers[key].push(observer);

      const value = this[key];
      // observer(value);

      // Return a function to unsubscribe this observer.
      return () => {
          this.#unsubscribe(key, observer);
      };
  }

  #unsubscribe(key, observer) {
     this.#observers[key] = this.#observers[key].filter(obs => obs !== observer);
  }

}
