import Node from "./Node.js";
import SimpleCollection from '../setup/SimpleCollection.js';

export default class NodeCollection extends SimpleCollection {

  instantiate(...arg){
    const node = new Node(...arg);
    return node;
  }

}
