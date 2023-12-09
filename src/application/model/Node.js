import { v4 as uuid } from "uuid";
import oneOf from "oneof";

import NodeReactivity from "./NodeReactivity.js";
import InputCollection from "../input/InputCollection.js";
import ReplyCollection from "../reply/ReplyCollection.js";

export default class Node extends NodeReactivity {
  application;

  #id;
  #type;


  #unsubscribe = [];

  Input = new InputCollection();
  Reply = new ReplyCollection();

  constructor({id, type}){

    super();

    if(!type) throw new Error('You must initialize a node with a known type');

    this.#id = id||uuid();
    this.#type = type;



    const props = {
      backgroundColor: oneOf([`url(#panel-primary)`,`url(#panel-secondary)`]), // `hsl(${parseInt(Math.random() * 360)}, 40%, 35%)`,
      horizontalPosition: 10_000*Math.random(),
      verticalPosition: 8_000*Math.random(),
      nodeWidth: 300,
      nodeHeight: 32,
      depthLevel: 0,
    };

    Object.entries(props).forEach(([key, val]) => this.defineReactiveProperty(key, val));


  }

  get id(){
    return this.#id;
  }

  get type(){
    return this.#type;
  }

  start(){
    const typeDeclaration = this.application.Types.find(this.#type);
    if(!typeDeclaration) throw new Error('You must initialize a node with a known type, unknown type: ' + this.#type);


    // console.log(`Node started (${typeDeclaration})`);
    if(typeDeclaration){
      console.log('THIS IS COPIED WRONG');

       typeDeclaration.Input.forEach(o=>{
         console.log('o.clone()', o.configuration)
         this.Input.create(o.configuration)
         // this.monitor( (...arg)=>console.log('MONITOR', arg) )
         //
         console.log('MONITOR POSITION OF DOT, COMBINE WITH MONITORING OF POSITION OF NODE ... wire must know position of this dot to sex x1x2');
       })
       typeDeclaration.Reply.forEach(o=>{
         console.log('o.clone()', o.configuration)
         this.Reply.create(o.configuration)
         // this.monitor( (...arg)=>console.log('MONITOR', arg) )
         //
         console.log('MONITOR POSITION OF DOT, COMBINE WITH MONITORING OF POSITION OF NODE ... wire must know position of this dot to sex x1x2');
       })


    }

    const d = 133;
    let intervalID = setInterval(() => {
      this.depthLevel = Math.random() > 0.5 ? 1 : 0;
      this.horizontalPosition = Math.random() > 0.5 ? this.horizontalPosition + d : this.horizontalPosition - d;
      this.verticalPosition = Math.random() > 0.5 ? this.verticalPosition + d : this.verticalPosition - d;
      this.backgroundColor = `hsl(${parseInt(Math.random() * 360)}, 40%, 35%)`;

    }, 10_000+(5_000*Math.random()) );

  }

  stop() {
    this.#unsubscribe.map((o) => o());
    // this.#element.empty();
  }

  async output(){
    console.log('TODO: produce output from Reply/output');
    return null;
  }

}
