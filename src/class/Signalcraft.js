import ReactiveArray from "../library/ReactiveArray.js";
import ReactiveObject from "../library/ReactiveObject.js";

export default class Signalcraft {

  nodes = new ReactiveArray();
  edges = new ReactiveArray();
  setup = new ReactiveObject({
    backgroundColor: 'green',
  });

  constructor() {}

  async ready() {}

  async start() {}

  async stop() {}

  addNode(){}
  removeNode(){}
  linkNodes(){}


}
