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

  constructor({id, type, values, properties, application}={}){
    super();
    this.#application = application;
    this.values = values || {};

    if(!type) throw new Error('You must initialize a node with a known type, type was not specified');

    this.Execute = new Standard(this);

    this.Input = new ReactiveArray({application, parent:this, Item:Input, auto:true }); // this is populated at instantiation of node by copying information from the pertinent type
    this.Output = new ReactiveArray({application, parent:this, Item:Output, auto:true }); // this is populated at instantiation of node by copying information from the pertinent type

    //NOTE: archetype is not a reactive object, same for archetype's .input and .reply
    const archetype = application.Archetypes.find(o=>o.type==type);
    if(!archetype) throw new Error(`Archetype not found. Unrecognized type detected "${type}"`);
    archetype.input.forEach(o=>{ this.Input.create(o) })
    archetype.output.forEach(o=>{ this.Output.create(o) })
    const options = {

      id: id||uuid(),
      type,
      backgroundColor: 'magenta',
      x: 999*Math.random(),
      y: 999*Math.random(),
      nodeWidth: 300,
      nodeHeight: 32,
      depthLevel: 0,
    };

    Object.entries({...options, ...properties}).forEach(([key, val]) => this.defineReactiveProperty(key, val));

  }

  start(){
  }

  stop() {
    this.#unsubscribe.map((o) => o());
  }

  port(name){
    const inputCandidate = this.Input.find(port=>port.name==name);
    if(inputCandidate) return inputCandidate;
    const outputCandidate = this.Output.find(port=>port.name==name);
    if(outputCandidate) return outputCandidate;
    if(!outputCandidate) throw new Error(`Port named ${name} was not found on node of type ${this.type}`);
  }

  get kind(){
    return this.#kind;
  }

  get application(){
    return this.#application;
  }

}
