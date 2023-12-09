import Type from "./Type.js";

import SimpleCollection from '../setup/SimpleCollection.js';

export default class TypeCollection extends SimpleCollection {

  instantiate(...arg){
    const type = new Type(...arg);
    return type;
  }

}
