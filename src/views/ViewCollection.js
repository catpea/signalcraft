import View from "./View.js";
import SimpleCollection from '../struct/SimpleCollection.js';

export default class ViewCollection extends SimpleCollection {

  instantiate(id, element){
    const view = new View(id, element);
    return view;
  }

}
