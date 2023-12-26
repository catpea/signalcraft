import { v4 as uuid } from "uuid";

import Standard from "../execute/Standard.js";

import ReactiveObject from "../system/ReactiveObject.js";
import ReactiveArray  from "../system/ReactiveArray.js";

import Input from "./node/Input.js";
import Output from "./node/Output.js";

export default class Node extends ReactiveObject {
  #kind = 'Node';

  #application;
  #unsubscribe = [];

  values;

  Input;
  Output;
  Execute;

  constructor(x){
    super();
    this.#application = x.application;
    const type = x.type;

    if(!type) throw new Error('You must initialize a node with a known type, type was not specified');

    this.Execute = new Standard(this);

    this.Input = new ReactiveArray({application:this.application, parent:this, Item:Input, auto:true }); // this is populated at instantiation of node by copying information from the pertinent type
    this.Output = new ReactiveArray({application:this.application, parent:this, Item:Output, auto:true }); // this is populated at instantiation of node by copying information from the pertinent type

    //NOTE: archetype is not a reactive object, same for archetype's .input and .reply
    const archetype = this.application.Archetypes.find(o=>o.type==type);
    if(!archetype) throw new Error(`Archetype not found. Unrecognized type detected "${type}"`);

    archetype.input.forEach(o=>{ this.Input.create(o) })
    archetype.output.forEach(o=>{ this.Output.create(o) })

    const archetypeDefaults = Object.fromEntries( archetype.input.map(o=>[o.id, o.value]) ); // Convert {name:*, value:*},{},{}... to an object

    const options = {
      id: x.id||uuid(),
      type ,
    };
    const payload = {...{x:0, y:0}, ...archetypeDefaults, ...x, ...options};
    delete payload.application
    Object.entries(payload).forEach(([key, val]) => this.defineReactiveProperty(key, val));

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
    if(!outputCandidate) throw new Error(`Port id ${id} was not found on node of type ${this.type}`);
  }

  get kind(){
    return this.#kind;
  }

  get application(){
    return this.#application;
  }

}
