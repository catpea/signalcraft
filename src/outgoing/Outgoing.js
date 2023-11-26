export default class Outgoing {

  #id;
  #format;
  #label;
  #generator;

  constructor(id, format, label, generator){

    this.#id = id;
    this.#format = format;
    this.#label = label;
    this.#generator = generator;
  }

  read(){
    // decode links
    return this.#generator();
  }

}
