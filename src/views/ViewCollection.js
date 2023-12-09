import View from "./View.js";
import SimpleCollection from '../setup/SimpleCollection.js';

export default class ViewCollection extends SimpleCollection {

  instantiate(...arg){
    const view = new View(...arg);
    return view;
  }

}
