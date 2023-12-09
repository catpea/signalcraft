import ReactiveObject from "../../system/ReactiveObject.js";

import { v4 as uuid } from "uuid";

export default class Input extends ReactiveObject {

  #configuration;
  #setup;

  constructor(configuration){
    super();
    this.#configuration = configuration;
    const defaults = {
      id:uuid(),
      name:'unnamed',
      direction: "input",
      type:'string',
      description:"none",
      x:0,
      y:0,
      generator: ()=>({}),
    };
    this.#setup = Object.assign({}, defaults, configuration);
    Object.entries(this.#setup).forEach(([key, val]) => this.defineReactiveProperty(key, val));
  }



  get configuration(){
    // new ID
    return this.#configuration;
  }

  read(){ // called by primary node's output function downstream
    // decode links
    // get output from links
    return {/*...*/};
  }

}
