export default class Incoming {
  direction = "in";
  #id;
  #format;
  #label;

  constructor(id, format, label){

    this.#id = id;
    this.#format = format;
    this.#label = label;

  }

  read(){ // called by primary node's output function downstream
    // decode links
    // get output from links
    return {/*...*/};
  }

}
