import { v4 as uuid } from "uuid";

import NodeReactivity from "./NodeReactivity.js";
import IncomingCollection from "../incoming/IncomingCollection.js";
import OutgoingCollection from "../outgoing/OutgoingCollection.js";

export default class Node extends NodeReactivity {
  application;

  #id;
  #type;
  #state;

  #unsubscribe = [];

  Incoming = new IncomingCollection();
  Outgoing = new OutgoingCollection();

  constructor(id, type, state={}){

    super();

    this.#id = id||uuid();
    this.#type = type;

    const defaults = {
      backgroundColor: `hsl(${parseInt(Math.random() * 360)}, 40%, 35%)`,
      horizontalPosition:  10_000*Math.random(),
      verticalPosition:  8_000*Math.random(),
      nodeWidth: 300,
      nodeHeight: 100,
      depthLevel: 0,
    };

    this.#state = Object.assign({}, state, defaults);
    Object.entries(this.#state).forEach(([key, val]) => this.defineReactiveProperty(key, val));


  }

  get id(){
    return this.#id;
  }

  start(){

    const typeDeclaration = this.application.Types.find(this.#type);
    if(typeDeclaration){
      this.Incoming.import( typeDeclaration.Incoming.export() );
      this.Outgoing.import( typeDeclaration.Outgoing.export() );
    }

    let intervalID = setInterval(() => {
      this.horizontalPosition = Math.random() > 0.5 ? this.horizontalPosition + 50 : this.horizontalPosition - 50;
      this.verticalPosition = Math.random() > 0.5 ? this.verticalPosition + 50 : this.verticalPosition - 50;
    }, 666+(5_000*Math.random()) );

  }

  stop() {
    this.#unsubscribe.map((o) => o());
    // this.#element.empty();
  }


}
