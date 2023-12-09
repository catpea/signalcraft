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

  linkPorts(sourceNode, targetNode, options = {reply:'reply', input:'input'}){
    const { reply:replyPort, input:inputPort } = options;
    return this.brain.Links.create({sourceNode, targetNode, replyPort, inputPort});
  }

  async execute(node, port='output'){
    if(!node) throw new Error('you must specify which node to execute');
    const output = await node.execute(port);
    console.log(`Output on port ${port} of node ${node.id}`, output)
    return output;
  }

}
