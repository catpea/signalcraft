#!/usr/bin/env node

import { strict as assert } from 'node:assert';
import ReactiveArray from "../src/data/lib/ReactiveArray.js";

// Testing the 'push' method
(() => {
  const ra = new ReactiveArray();
  ra.push(5);
  assert.strictEqual( ra.at(0), 5 );
})();

// Testing the 'pop' method
(() => {
  const ra = new ReactiveArray();
  ra.push(5);
  const value = ra.pop();
  assert.strictEqual(value, 5);
  assert.strictEqual(ra.length(), 0);
})();

// Testing the 'reverse' method
(() => {
  const ra = new ReactiveArray();
  ra.push(5, 6);
  assert.strictEqual(ra.at(1), 6);
  ra.reverse();
  assert.strictEqual(ra.at(1), 5);

})();

// Testing the 'shift' method
(() => {
  const ra = new ReactiveArray();
  ra.push(5, 6);
  const value = ra.shift();
  assert.strictEqual(value, 5);
  assert.strictEqual(ra.length(), 1);
})();

// Testing the 'unshift' method
(() => {
  const ra = new ReactiveArray();
  ra.unshift(5, 6);
  assert.strictEqual(ra.at(0), 5);
  assert.strictEqual(ra.at(1), 6);
})();

// Testing the 'splice' method
(() => {
  const ra = new ReactiveArray();
  ra.push(5, 6, 7);
  const value = ra.splice(1, 1, 8);
  assert.strictEqual(value[0], 6);
  assert.strictEqual(ra.length(), 3);
  assert.strictEqual(ra.at(1), 8);
})();

// Testing the 'sort' method
(() => {
  const ra = new ReactiveArray();
  ra.push(6, 5);
  ra.sort();
  assert.strictEqual(ra.at(0), 5);
  assert.strictEqual(ra.at(1), 6);
})();

// Testing the 'fill' method
(() => {
  const ra = new ReactiveArray();
  ra.push(5, 6);
  ra.fill(7, 0, ra.length());
  assert.strictEqual(ra.at(0), 7);
  assert.strictEqual(ra.at(1), 7);
})();

// Testing the 'copyWithin' method
(() => {
  const ra = new ReactiveArray();
  ra.push(5, 6);
  ra.copyWithin(0, 1, ra.length());
  assert.strictEqual(ra.at(0), 6);
  assert.strictEqual(ra.at(1), 6);
})();
