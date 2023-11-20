import ReactiveArray from './lib/ReactiveArray.js';

globalThis.signalcraftDatabase = new Promise(async (resolve, reject) => {

  return resolve({
    nodes:new ReactiveArray(),
    edges:new ReactiveArray(),
    todos:new ReactiveArray(),
  });

});
