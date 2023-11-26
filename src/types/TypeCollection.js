import Type from "./Type.js";

import SimpleCollection from '../struct/SimpleCollection.js';

export default class TypeCollection extends SimpleCollection {

  instantiate(category, name){
    const type = new Type(category, name);
    return type;
  }

}
