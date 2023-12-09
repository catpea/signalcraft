import Input from "./Input.js";
import SimpleCollection from '../setup/SimpleCollection.js';

export default class InputCollection extends SimpleCollection {

  instantiate(...arg){
    const input = new Input(...arg);
    return input;
  }

}
