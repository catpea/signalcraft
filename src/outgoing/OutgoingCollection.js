import Outgoing from "./Outgoing.js";
import SimpleCollection from '../struct/SimpleCollection.js';

export default class OutgoingCollection extends SimpleCollection {

  instantiate(id, format, label, generator){
    const output = new Outgoing(id, format, label, generator);
    return output;
  }

}
