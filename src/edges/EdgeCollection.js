import Edge from "./Edge.js";
import SimpleCollection from '../setup/SimpleCollection.js';

export default class EdgeCollection extends SimpleCollection {

  instantiate(...arg){
    const edge = new Edge(...arg);
    return edge;
  }

}
