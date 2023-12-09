import Input from "./Input.js";
import SimpleCollection from '../setup/SimpleCollection.js';

export default class InputCollection extends SimpleCollection {

  instantiate(id, format, label){
    const input = new Input(id, format, label);
    return input;
  }

}
