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

  // Theme
  #bg = `hsl(${parseInt(Math.random() * 360)}, 40%, 35%)`;

  constructor() {
    let intervalID = setInterval(() => {
      this.x = Math.random() > 0.5 ? this.x + 50 : this.x - 50;
      this.y = Math.random() > 0.5 ? this.y + 50 : this.y - 50;
    }, 5_000*Math.random());
  }

  #subscribers = {};

  notify({type, name, oldVal, newVal}) {
    Object.values(this.#subscribers).forEach((callback) =>
      callback({ type, name, oldVal, newVal, node:this })
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

  set id(newVal) {
    const oldVal = this.#id;
    this.#id = newVal;
    this.version++;
    this.notify({ type: "updated", name: "id", newVal, oldVal });
  }
  get id() {
    return this.#id;
  }

  set name(newVal) {
    const oldVal = this.#name;
    this.#name = newVal;
    this.version++;
    this.notify({ type: "updated", name: "name", newVal, oldVal });
  }
  get name() {
    return this.#name;
  }

  set bg(newVal) {
    const oldVal = this.#bg;
    this.#bg = newVal;
    this.version++;
    this.notify({ type: "updated", name: "bg", newVal, oldVal });
  }
  get bg() {
    return this.#bg;
  }

  set version(newVal) {
    this.#version++;
  }

  get version() {
    return this.#version;
  }

  set x(newVal) {
    const oldVal = this.#x;
    this.#x = newVal;
    this.version++;
    this.notify({ type: "updated", name: "x", newVal, oldVal });
  }
  get x() {
    return this.#x;
  }

  set y(newVal) {
    const oldVal = this.#y;
    this.#y = newVal;
    this.version++;
    this.notify({ type: "updated", name: "y", newVal, oldVal });
  }
  get y() {
    return this.#y;
  }

  set z(newVal) {
    const oldVal = this.#z;
    this.#z = newVal;
    this.version++;
    this.notify({ type: "updated", name: "z", newVal, oldVal });
  }
  get z() {
    return this.#z;
  }

  set h(newVal) {
    const oldVal = this.#h;
    this.#h = newVal;
    this.version++;
    this.notify({ type: "updated", name: "h", newVal, oldVal });
  }
  get h() {
    return this.#h;
  }

  set w(newVal) {
    const oldVal = this.#w;
    this.#w = newVal;
    this.version++;
    this.notify({ type: "updated", name: "w", newVal, oldVal });
  }
  get w() {
    return this.#w;
  }
}
