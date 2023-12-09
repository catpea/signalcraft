import { v4 as uuid } from "uuid";
import oneOf from "oneof";

import ReactiveObject from "../system/ReactiveObject.js";
import ReactiveArray  from "../system/ReactiveArray.js";

import Input from "./node/Input.js";
import Output from "./node/Output.js";

export default class Node extends ReactiveObject {

  #application;
  #unsubscribe = [];

  Input;
  Output;

  constructor({id, type, application}){
    super();
    this.#application = application;

    this.Input = new ReactiveArray({application, parent:this, Item:Input, auto:true }); // this is populated at instantiation of node by copying information from the pertinent type
    this.Output = new ReactiveArray({application, parent:this, Item:Output, auto:true }); // this is populated at instantiation of node by copying information from the pertinent type

    //NOTE: archetype is not a reactive object, same for archetype's .input and .reply
    const archetype = application.Types.find(type);
    if(!archetype) throw new Error('You must initialize a node with a known type, unknown type detected: ' + this.type);
    archetype.input.forEach(o=>{ this.Input.create(o) })
    archetype.output.forEach(o=>{ this.Output.create(o) })

    const props = {
      id: id||uuid(),
      type,
      backgroundColor: oneOf([`url(#panel-primary)`,`url(#panel-secondary)`]), // `hsl(${parseInt(Math.random() * 360)}, 40%, 35%)`,
      horizontalPosition: 10_000*Math.random(),
      verticalPosition: 8_000*Math.random(),
      nodeWidth: 300,
      nodeHeight: 32,
      depthLevel: 0,
    };

    Object.entries(props).forEach(([key, val]) => this.defineReactiveProperty(key, val));

  }

  start(){
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
  }

  async #upstream(){
    const response = {BUG:'untested', TODO: 'you may still have to spider all the links, lol!'};

    for (const localPort of this.Input) {
      // NOTE: edges do not link nodes, they link ports
      // NOTE: there can be multiple reply ports pointing to the input port, therefore array is used
      response[localPort.name] = [];
      // find links that have target set to inputProperty.id
      const incomingLinks = this.#application.Links.filter(remoteLink=>remoteLink.target==localPort.id);
      for (const incomingLink of incomingLinks) {
        // get their parent node,
        const parentNode = incomingLink.parent;
        const connectedPort = parentNode.Output.find(item=>item.id==incomingLink.source);
        // and get them executed (parent node is requred as it pnows the properties the funcion needs)
        const result = parentNode.execute(connectedPort.name);
        response[localPort.name].push(result);
      }
    }
    return response;
  }

  async execute(port){
    console.log('TODO: produce output from Output');
    const output = this.Output.find(item=>item.name==port);
    if(!output) throw new Error(`Port named ${port} was not found on node of type ${this.type}`);
    const response = await output.generator(await this.#upstream())
    return response;
  }

}
