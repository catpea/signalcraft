import Edge from "./Edge.js";
import SimpleCollection from '../setup/SimpleCollection.js';

export default class EdgeCollection extends SimpleCollection {

  instantiate(id, type){
    const edge = new Edge(id, type);
    return edge;
  }

}
