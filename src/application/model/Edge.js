import { v4 as uuid } from "uuid";
import ReactiveObject from "../system/ReactiveObject.js";

export default class Edge extends ReactiveObject {
  application;
  #id;
  #type;

  #sourceNode;
  #targetNode;
  #replyPort;
  #inputPort;

  #unsubscribe = [];

  constructor({id, type, sourceNode,replyPort, targetNode,inputPort}){
    super();

    this.#id = id||uuid();
    this.#type = type;

    this.#sourceNode = sourceNode;
    this.#targetNode = targetNode;
    this.#replyPort = replyPort;
    this.#inputPort = inputPort;

    //NOTE: once nodes are added to the system the x and y of edges are already calculated (sans the transformation).

    const props = {
      backgroundColor: `hsl(${parseInt(Math.random() * 360)}, 40%, 35%)`,
      horizontalPosition1: 10_000*Math.random(),
      verticalPosition1: 8_000*Math.random(),
      horizontalPosition2: 10_000*Math.random(),
      verticalPosition2: 8_000*Math.random(),
      edgeWidth: 10,
      depthLevel: 0,
    };

    Object.entries(props).forEach(([key, val]) => this.defineReactiveProperty(key, val));

    // TODO: subscribe to the port, and its x and y coordinates
    // NOTE: thse coordinates will be relative to the node's <g> tag, so the position of the node must be added.
    //       the port position x/y is relative to 0,0 of the node, but node will have its own x/y you have to add that x-on-node + x-of-port, and y-of-node+y-of-port


  }

  get id(){
    return this.#id;
  }

  get type(){
    return this.#type;
  }

  start(){
  }

  stop() {
    this.#unsubscribe.map((o) => o());
  }

}
