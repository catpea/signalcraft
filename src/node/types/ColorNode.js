import NodeCore from "./base/NodeCore.js";

export default class ColorNode extends NodeCore {

  constructor() {
    super();
    this.functions.push({id:'output'});
    this.properties.push({id:'color'});
  }

  output(){
    // spider up to inputs
    // spider up to all properties
    // return data based on inputs+properties;
  }

  #input = null;
  set input(v) {
    this.#input = v;
    this.version++;
    this.notify('updated', 'input', v);
  }
  get input() {
    return this.#input;
  }

  // custom properties

  #color = 'white';
  set color(v) {
    this.#color = v;
    this.version++;
    this.notify('updated', 'color', v);
  }
  get color() {
    return this.#color;
  }


}
