import ReplyReactivity from "./ReplyReactivity.js";

import { v4 as uuid } from "uuid";

export default class Reply extends ReplyReactivity {

  #configuration;
  #setup;

  constructor(configuration){
    super();
    this.#configuration = configuration;
    const defaults = {
      id:uuid(),
      name:'unnamed',
      direction: "reply",
      type:'string',
      description:"none",
      x:0,
      y:0,
      generator: ()=>({}),
    };
    this.#setup = Object.assign({}, defaults, configuration);
    Object.entries(this.#setup).forEach(([key, val]) => this.defineReactiveProperty(key, val));
    // this.monitor( (...arg)=>console.log('MONITOR', arg) )
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
