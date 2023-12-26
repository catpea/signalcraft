import { v4 as uuid } from "uuid";

import Standard from "../execute/Standard.js";

import ReactiveObject from "../system/ReactiveObject.js";
import ReactiveArray  from "../system/ReactiveArray.js";

import Input from "./node/Input.js";
import Output from "./node/Output.js";

export default class Junction extends ReactiveObject {
  #kind = 'Junction';

  #application;
  #unsubscribe = [];

  values;

  Input;
  Output;
  Execute;

  constructor(x){
    super();
    this.#application = x.application;

    this.values = {};

    this.Execute = new Standard(this);

    this.Input = new ReactiveArray({application: x.application, parent:this, Item:Input, auto:true }); // this is populated at instantiation of node by copying information from the pertinent type
    this.Output = new ReactiveArray({application: x.application, parent:this, Item:Output, auto:true }); // this is populated at instantiation of node by copying information from the pertinent type

    this.Input.create({id:"input"});
    this.Output.create({id:"output", program:({input}) => input });

    const props = {
      id: x.id||uuid(),
      x:x.x||0,
      y:x.y||0,
    };

    Object.entries(props).forEach(([key, val]) => this.defineReactiveProperty(key, val));

  }

  start(){
  }

  stop() {
    this.#unsubscribe.map((o) => o());
  }

  port(id){
    const inputCandidate = this.Input.find(port=>port.id==id);
    if(inputCandidate) return inputCandidate;
    const outputCandidate = this.Output.find(port=>port.id==id);
    if(outputCandidate) return outputCandidate;
    if(!output) throw new Error(`Port named ${name} was not found on node of type ${this.type}`);
  }

  get kind(){
    return this.#kind;
  }

  get application(){
    return this.#application;
  }

}
