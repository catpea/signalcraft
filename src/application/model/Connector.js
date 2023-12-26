import { v4 as uuid } from "uuid";
import ReactiveObject from "../system/ReactiveObject.js";

export default class Connector extends ReactiveObject {

  #kind = 'Connector';

  application;
  #unsubscribe = [];

  constructor({id, application, sourceType, targetType, sourceNode, targetNode, sourcePort, targetPort }){
    super();
    this.application = application;

    //NOTE: once nodes are added to the system the x and y of edges are already calculated (sans the transformation).

    const props = {
      id:id||uuid(),

      sourceType,
      sourceNode,
      sourcePort,

      targetType,
      targetNode,
      targetPort,
      //
      // x1:0,
      // y1:0,
      // x2:0,
      // y2:0,

    };

    Object.entries(props).forEach(([key, val]) => this.defineReactiveProperty(key, val));

    // TODO: subscribe to the port, and its x and y coordinates
    // NOTE: thse coordinates will be relative to the node's <g> tag, so the position of the node must be added.
    //       the port position x/y is relative to 0,0 of the node, but node will have its own x/y you have to add that x-on-node + x-of-port, and y-of-node+y-of-port


  }

  start(){
  }

  stop() {
    this.#unsubscribe.map((o) => o());
  }

  get kind(){
    return this.#kind;
  }

}
