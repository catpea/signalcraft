import NodeCore from "./base/NodeCore.js";

export default class TextNode extends NodeCore {

  constructor() {
    super();
    this.functions.push({id:'output'});
    this.properties.push({id:'text'});
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

  #text = 'white';
  set text(v) {
    this.#text = v;
    this.version++;
    this.notify('updated', 'text', v);
  }
  get text() {
    return this.#text;
  }


}
