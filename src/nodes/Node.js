import { v4 as uuid } from "uuid";

import NodeReactivity from "./NodeReactivity.js";
import IncomingCollection from "../input/IncomingCollection.js";
import OutgoingCollection from "../reply/OutgoingCollection.js";

export default class Node extends NodeReactivity {
  application;

  #id;
  #type;
  #state;

  #unsubscribe = [];

  Input = new IncomingCollection();
  Reply = new OutgoingCollection();

  constructor(id, type, state={}){

    super();

    if(!type) throw new Error('You must initialize a node with a known type');

    this.#id = id||uuid();
    this.#type = type;

    const defaults = {
      backgroundColor: `hsl(${parseInt(Math.random() * 360)}, 40%, 35%)`,
      horizontalPosition:  10_000*Math.random(),
      verticalPosition:  8_000*Math.random(),
      nodeWidth: 300,
      nodeHeight: 32,
      depthLevel: 0,
    };

    this.#state = Object.assign({}, state, defaults);
    Object.entries(this.#state).forEach(([key, val]) => this.defineReactiveProperty(key, val));


  }

  get id(){
    return this.#id;
  }

  get type(){
    return this.#type;
  }

  start(){
    if(!this.#type) throw new Error('You must initialize a node with a known type');

    const typeDeclaration = this.application.Types.find(this.#type);

    // console.log(`Node started (${typeDeclaration})`);
    if(typeDeclaration){
      this.Input.import( typeDeclaration.Input.export() );
      this.Reply.import( typeDeclaration.Reply.export() );
    }

    let intervalID = setInterval(() => {
      this.depthLevel = Math.random() > 0.5 ? 1 : 0;
      this.horizontalPosition = Math.random() > 0.5 ? this.horizontalPosition + 50 : this.horizontalPosition - 50;
      this.verticalPosition = Math.random() > 0.5 ? this.verticalPosition + 50 : this.verticalPosition - 50;
      this.backgroundColor = `hsl(${parseInt(Math.random() * 360)}, 40%, 35%)`;

    }, 666+(5_000*Math.random()) );

  }

  stop() {
    this.#unsubscribe.map((o) => o());
    // this.#element.empty();
  }


}
