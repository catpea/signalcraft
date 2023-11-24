import { v4 as uuid } from "uuid";

export default class Node {
  #deleted = false;
  #id = "id" + uuid();
  #version = 1;
  #name = null;

  properties = []; // inputs
  functions = []; // outputs

  // Geometry
  #x = Math.random() * 7_000;
  #y = Math.random() * 7_000;
  #z = 0;
  #h = 100;
  #w = 300;
  #bg = `hsl(${ parseInt(Math.random() * 360) }, 40%, 35%)`;

  constructor() {}

  #subscribers = {};

  notify(type, property, value) {
    Object.values(this.#subscribers).forEach((callback) =>
      callback(type, property, value)
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

  set id(v) {
    this.#id = v;
    this.version++;
    this.notify("updated", "id", v);
  }
  get id() {
    return this.#id;
  }



  set name(v) {
    this.#name = v;
    this.version++;
    this.notify("updated", "name", v);
  }
  get name() {
    return this.#name;
  }

  set bg(v) {
    this.#bg = v;
    this.version++;
    this.notify("updated", "bg", v);
  }
  get bg() {
    return this.#bg;
  }



  set version(noop) {
    // silent update
    this.#version++;
  }
  get version() {
    return this.#version;
  }



  set x(v) {
    this.#x = v;
    this.version++;
    this.notify("updated", "x", v);
  }
  get x() {
    return this.#x;
  }

  set y(v) {
    this.#y = v;
    this.version++;
    this.notify("updated", "y", v);
  }
  get y() {
    return this.#y;
  }

  set z(v) {
    this.#z = v;
    this.version++;
    this.notify("updated", "z", v);
  }
  get z() {
    return this.#z;
  }

  set h(v) {
    this.#h = v;
    this.version++;
    this.notify("updated", "h", v);
  }
  get h() {
    return this.#h;
  }

  set w(v) {
    this.#w = v;
    this.version++;
    this.notify("updated", "w", v);
  }
  get w() {
    return this.#w;
  }
}
