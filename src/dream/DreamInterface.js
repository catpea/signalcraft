import { v4 as uuid } from "uuid";

export default class DreamInterface {

  brain;

  constructor(brain){
    this.brain = brain;
  }

  addNode(type){
    // Procedure Step 1: create a node of the desired type in the reactive collection
    return this.brain.Nodes.create({type});
  }

  linkPorts(sourceNode, targetNode, options = {output:'output', input:'input'}){
    const { output, input } = options;
    // return this.brain.Edges.create(uuid(), nodeType);
  }

  async run(node){
    if(!node) throw new Error('you must specify which node to run');
    const output = await node.output();
    console.log(`Output of node ${node.id}`, output)
    return output;
  }

}
