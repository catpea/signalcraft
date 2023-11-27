import Node from "./Node.js";
import SimpleCollection from '../struct/SimpleCollection.js';

export default class NodeCollection extends SimpleCollection {

  instantiate(id, type){
    const node = new Node(id, type);
    return node;
  }

}