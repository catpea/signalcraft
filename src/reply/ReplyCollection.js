import Reply from "./Reply.js";
import SimpleCollection from '../setup/SimpleCollection.js';

export default class ReplyCollection extends SimpleCollection {

  instantiate(...arg){
    const reply = new Reply(...arg);
    return reply;
  }

}
