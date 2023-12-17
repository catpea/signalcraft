import { v4 as uuid } from "uuid";

export default class DreamInterface {

  application;

  constructor(application){
    this.application = application;
  }

  getApplication(){
    return this.application;
  }

  select(reference){
    // NOTE: the selected object id is used as selection ID
    return this.application.Selection.create({id:reference.id, kind:reference.kind, reference});
  }
  toggleSelect(item){
    if(this.application.Selection.has(item.id)){
      return this.application.Selection.remove(item.id, true);
    }else{
      return this.application.Selection.create({id:item.id, kind:item.kind, reference:item});
    }
  }
  deselect(item){
    return this.application.Selection.remove(item.id, true);
  }
  deselectAll(item){
    return this.application.Selection.forEach(({id})=>this.application.Selection.remove(id, true));
  }

  addNode(type, values){
    // Procedure Step 1: create a node of the desired type in the reactive collection
    return this.application.Nodes.create({type, values});
  }

  linkPorts(sourceNode, targetNode, options = {output:'output', input:'input'}){
    const { output:outputPort, input:inputPort } = options;
    return this.application.Links.create({ sourceNode: sourceNode.id, targetNode: targetNode.id, sourcePort: sourceNode.getPort(outputPort).id, targetPort: targetNode.getPort(inputPort).id, });
  }

  async execute(node, port='output'){
    if(!node) throw new Error('you must specify which node to execute');
    const output = await node.execute(port);
    console.log(`Output on port ${port} of node ${node.id}`, output)
    return output;
  }

}
