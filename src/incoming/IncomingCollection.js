import Incoming from "./Incoming.js";
import SimpleCollection from '../struct/SimpleCollection.js';

export default class IncomingCollection extends SimpleCollection {

  instantiate(id, format, label){
    const input = new Incoming(id, format, label);
    return input;
  }

}
