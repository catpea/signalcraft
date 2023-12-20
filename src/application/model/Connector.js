import { v4 as uuid } from "uuid";
import ReactiveObject from "../system/ReactiveObject.js";

export default class Connector extends ReactiveObject {

  #kind = 'Connector';

  application;
  #unsubscribe = [];

  constructor({application, id, sourceType, targetType, sourceNode, targetNode, sourcePort, targetPort }){
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

      backgroundColor: `hsl(${parseInt(Math.random() * 360)}, 40%, 35%)`,


      x1: 10_000*Math.random(),
      y1: 8_000*Math.random(),
      x2: 10_000*Math.random(),
      y2: 8_000*Math.random(),

      edgeWidth: 10,
      depthLevel: 0,
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
