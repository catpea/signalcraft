import Type from "./Type.js";

import SimpleCollection from '../setup/SimpleCollection.js';

export default class TypeCollection extends SimpleCollection {

  instantiate(category, name){
    const type = new Type(category, name);
    return type;
  }

}
