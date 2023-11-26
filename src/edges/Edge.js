export default class Edge {

  #id;
  #type;
  #source;
  #target;

  constructor(id, type, source, target){
    this.#id = id;
    this.#type = type;
    this.#source = source;
    this.#target = target;
  }

  start(){
    // const div = document.createElement("div");
    // const txt = document.createTextNode(`HELLO: ${this.#name}`);
    // div.appendChild(txt);
    // this.#element.appendChild(div);
  }

}
