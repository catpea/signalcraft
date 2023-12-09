import Reply from "./Reply.js";
import SimpleCollection from '../setup/SimpleCollection.js';

export default class ReplyCollection extends SimpleCollection {

  instantiate(id, format, label, generator){
    const output = new Reply(id, format, label, generator);
    return output;
  }

}
