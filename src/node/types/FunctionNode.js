import NodeCore from "./base/NodeCore.js";

export default class CodeNode extends NodeCore {

  constructor() {
    super();
    this.functions.push({id:'output'});
    this.properties.push({id:'code'});
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

  #code = 'white';
  set code(v) {
    this.#code = v;
    this.version++;
    this.notify('updated', 'code', v);
  }
  get code() {
    return this.#code;
  }


}
