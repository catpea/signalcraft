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
  removeSelected(){
    const { Selection, Nodes, Connectors } = this.application;
    Selection.filter(item=>item.kind=='Node').forEach(({id})=>Connectors.destroy(link=>link.sourceNode==id), true);
    Selection.filter(item=>item.kind=='Node').forEach(({id})=>Connectors.destroy(link=>link.targetNode==id), true);
    Selection.filter(item=>item.kind=='Node').forEach(({id})=>Nodes.remove(id, true));
    Selection.filter(item=>item.kind=='Connector').forEach(({id})=>Connectors.remove(id, true));
    Selection.clear(true);
  }

  addNode(type, values, properties){
    // Procedure Step 1: create a node of the desired type in the reactive collection
    const node = this.application.Nodes.create({type, values, properties});
    this.deselectAll();
    this.deselectAll();
    this.select(node);
    return node;
  }

  linkPorts(sourceNode, targetNode, options = {}){
    const { output:outputPort, input:inputPort } = Object.assign({output:'output', input:'input'}, options);

    return this.application.Connectors.create({ sourceNode: sourceNode.id, targetNode: targetNode.id, sourcePort: sourceNode.port(outputPort).id, targetPort: targetNode.port(inputPort).id, });
  }

  async execute(node, port='output'){
    if(!node) throw new Error('you must specify which node to execute');
    const output = await node.Execute.run(port);
    console.log(`Output on port ${port} of node ${node.id}`, output)
    return output;
  }

}
