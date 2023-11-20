export default class ReactiveArray {
  #paused = false;
  #array = [];
  #listeners = [];

  // methods that mutate array
  push(...items) {
    const result = this.#array.push(...items);
    this.#notify();
    return result;
  }

  pop() {
    const item = this.#array.pop();
    this.#notify();
    return item;
  }

  reverse() {
    this.#array = [...this.#array.reverse()];
    this.#notify();
    return this.#array;
  }

  shift() {
    const result = this.#array.shift();
    this.#notify();
    return result;
  }

  unshift(...items) {
    const result = this.#array.unshift(...items);
    this.#notify();
    return result;
  }

  splice(start, deleteCount, ...items) {
    const result = this.#array.splice(start, deleteCount, ...items);
    this.#notify();
    return result;
  }

  sort(compareFunction) {
    const result = this.#array.sort(compareFunction);
    this.#notify();
    return result;
  }

  fill(value, start, end) {
    const result = this.#array.fill(value, start, end);
    this.#notify();
    return result;
  }

  copyWithin(target, start, end) {
    const result = this.#array.copyWithin(target, start, end);
    this.#notify();
    return result;
  }




  // methods that do not mutate array
  at(index) {
    return this.#array.at(index);
  }

  concat(...args) {
    return this.#array.concat(...args);
  }

  join(separator) {
    return this.#array.join(separator);
  }

  slice(start, end) {
    return this.#array.slice(start, end);
  }

  toLocaleString() {
    return this.#array.toLocaleString();
  }

  toString() {
    return this.#array.toString();
  }

  includes(valueToFind, fromIndex) {
    return this.#array.includes(valueToFind, fromIndex);
  }

  indexOf(searchElement, fromIndex) {
    return this.#array.indexOf(searchElement, fromIndex);
  }

  lastIndexOf(searchElement, fromIndex) {
    return this.#array.lastIndexOf(searchElement, fromIndex);
  }

  map(callbackfn, thisArg) {
    return this.#array.map(callbackfn, thisArg);
  }

  reduce(callbackfn, initialValue) {
    return this.#array.reduce(callbackfn, initialValue);
  }

  reduceRight(callbackfn, initialValue) {
    return this.#array.reduceRight(callbackfn, initialValue);
  }

  forEach(callbackfn, thisArg) {
    return this.#array.forEach(callbackfn, thisArg);
  }

  filter(callbackfn, thisArg) {
    return this.#array.filter(callbackfn, thisArg);
  }

  some(callbackfn, thisArg) {
    return this.#array.some(callbackfn, thisArg);
  }

  every(callbackfn, thisArg) {
    return this.#array.every(callbackfn, thisArg);
  }

  flat(depth) {
    return this.#array.flat(depth);
  }

  flatMap(callbackfn, thisArg) {
    return this.#array.flatMap(callbackfn, thisArg);
  }

  entries() {
    return this.#array.entries();
  }

  keys() {
    return this.#array.keys();
  }

  values() {
    return this.#array.values();
  }

  // helpers
  length() {
    return this.#array.length;
  }

  isEmpty() {
    return this.#array.length === 0;
  }

  isNotEmpty() {
    return !this.isEmpty();
  }

  first() {
    return this.#array[0];
  }

  last() {
    return this.#array[this.length() - 1];
  }

  toArray() {
    return [...this.#array];
  }

  dump() {
    console.log(`Array`, this.#array);
  }

  printDebug() {
    console.log(`Array: ${this.#array}`);
    console.log(`Listeners: ${this.#listeners.length}`);
  }

  // subscriptions

  #notify() {
    if (this.#paused) return;
    this.#listeners.forEach((callback) => callback(this.#array));
  }

  subscribe(callback) {
    if (typeof callback !== "function") {
      throw new Error("callback should be a function");
    }
    this.#listeners.push(callback);
    return () => this.unsubscribe(callback);
  }
  unsubscribe(callback) {
    this.#listeners = this.#listeners.filter((cb) => cb !== callback);
  }

  // batch subscriptions
  pauseSubscriptions() {
    this.#paused = true;
  }
  resumeSubscriptions() {
    this.#paused = false;
    this.#notify();
  }
  // advanced extras
  clearSubscriptions() {
    this.#listeners = [];
  }
}
