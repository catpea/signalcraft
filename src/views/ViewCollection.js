import View from "./View.js";
import SimpleCollection from '../setup/SimpleCollection.js';

export default class ViewCollection extends SimpleCollection {

  instantiate(id, element){
    const view = new View(id, element);
    return view;
  }

}
