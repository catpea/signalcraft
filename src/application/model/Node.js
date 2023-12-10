import { v4 as uuid } from "uuid";
import oneOf from "oneof";

import ReactiveObject from "../system/ReactiveObject.js";
import ReactiveArray  from "../system/ReactiveArray.js";

import Input from "./node/Input.js";
import Output from "./node/Output.js";

export default class Node extends ReactiveObject {

  #application;
  #unsubscribe = [];

  #values;

  Input;
  Output;

  constructor({id, type, values, application}){
    super();
    this.#application = application;
    this.#values = values || {};

    if(!type) throw new Error('You must initialize a node with a known type, type was not specified');

    this.Input = new ReactiveArray({application, parent:this, Item:Input, auto:true }); // this is populated at instantiation of node by copying information from the pertinent type
    this.Output = new ReactiveArray({application, parent:this, Item:Output, auto:true }); // this is populated at instantiation of node by copying information from the pertinent type

    //NOTE: archetype is not a reactive object, same for archetype's .input and .reply
    const archetype = application.Types.find(o=>o.type==type);
    if(!archetype) throw new Error(`Archetype not found. Unrecognized type detected "${type}"`);
    archetype.input.forEach(o=>{ this.Input.create(o) })
    archetype.output.forEach(o=>{ this.Output.create(o) })
    const props = {

      id: id||uuid(),
      type,
      backgroundColor: oneOf([`url(#panel-primary)`,`url(#panel-secondary)`]), // `hsl(${parseInt(Math.random() * 360)}, 40%, 35%)`,
      x: 999*Math.random(),
      y: 999*Math.random(),
      nodeWidth: 300,
      nodeHeight: 32,
      depthLevel: 0,
    };

    Object.entries(props).forEach(([key, val]) => this.defineReactiveProperty(key, val));

  }

  start(){
    // const d = 133;
    // let intervalID = setInterval(() => {
    //   this.depthLevel = Math.random() > 0.5 ? 1 : 0;
    //   this.x = Math.random() > 0.5 ? this.x + d : this.x - d;
    //   this.y = Math.random() > 0.5 ? this.y + d : this.y - d;
    //   this.backgroundColor = `hsl(${parseInt(Math.random() * 360)}, 40%, 35%)`;
    // }, 10_000+(5_000*Math.random()) );
  }

  stop() {
    this.#unsubscribe.map((o) => o());
  }


  getPort(name){
    const inputCandidate = this.Input.find(port=>port.name==name);
    if(inputCandidate) return inputCandidate;
    const outputCandidate = this.Output.find(port=>port.name==name);
    if(outputCandidate) return outputCandidate;
    if(!output) throw new Error(`Port named ${name} was not found on node of type ${this.type}`);
  }

  async #upstream(){
    const response = {};
    for (const localPort of this.Input) {
      // NOTE: edges do not link nodes, they link ports
      // NOTE: there can be multiple reply ports pointing to the input port, therefore array is used
      response[localPort.name] = [];
      // find links that have target set to inputProperty.id
      const incomingLinks = this.#application.Links.filter(remoteLink=>remoteLink.targetPort==localPort.id);
      const nothingConnected = incomingLinks.length == 0;

      if(nothingConnected){
        let currentValue = localPort.value; // DEFAULT VALUE
        if(this.#values[localPort.name]) currentValue = this.#values[localPort.name] // USER PRESET/OVVERIDE
        response[localPort.name].push(currentValue);
      }else{
        for (const incomingLink of incomingLinks) {
          // get their parent node,
          const parentNode = this.#application.Nodes.find( node => node.id == incomingLink.sourceNode );
          const connectedPort = parentNode.Output.find(item=>item.id==incomingLink.sourcePort);
          // and get them executed (parent node is requred as it pnows the properties the funcion needs)
          const result = await parentNode.execute(connectedPort.name);
          response[localPort.name].push(result);
        }
      }


    }
    return response;
  }

  async execute(port){
    const output = this.Output.find(item=>item.name==port);
    if(!output) console.log(this);;
    if(!output) throw new Error(`Port named ${port} was not found on node of type ${this.type}`);
    const response = await output.generator({...await this.#upstream(), value: output.value})
    return response;
  }

}
