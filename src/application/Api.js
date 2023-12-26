import { v4 as uuid } from "uuid";

export default class Api {

  application;

  constructor(application){
    this.application = application;
  }

  getApplication(){
    return this.application;
  }


  selectTheme(name){
    this.application.Setup.theme = name;
    document.querySelector('html').dataset.uiTheme = name;
  }
  selectedTheme(name){
    return this.application.Setup.theme;
    // return document.querySelector('html').dataset.uiTheme;
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
    const { Selection, Nodes, Connectors, Junctions } = this.application;

    Selection.filter(item=>item.kind=='Junction').forEach(({id})=>Connectors.destroy(link=>link.sourceNode==id, true));
    Selection.filter(item=>item.kind=='Junction').forEach(({id})=>Connectors.destroy(link=>link.targetNode==id, true));
    Selection.filter(item=>item.kind=='Junction').forEach(({id})=>Junctions.remove(id, true));

    Selection.filter(item=>item.kind=='Node').forEach(({id})=>Connectors.destroy(link=>link.sourceNode==id, true));
    Selection.filter(item=>item.kind=='Node').forEach(({id})=>Connectors.destroy(link=>link.targetNode==id, true));

    Selection.filter(item=>item.kind=='Node').forEach(({id})=>Nodes.remove(id, true));

    Selection.filter(item=>item.kind=='Connector').forEach(({id})=>Connectors.remove(id, true));
    Selection.clear(true);
  }

  addNode(archetype, properties){
    // Procedure Step 1: create a node of the desired type in the reactive collection
    const node = this.application.Nodes.create({type: archetype, ...properties});
    this.deselectAll();
    this.select(node);
    return node;
  }

  addJunction(properties){
    const junction = this.application.Junctions.create(properties);
    return junction;
  }

  linkPorts(sourceNode, targetNode, options = {}){
    const { output:outputPort, input:inputPort } = Object.assign({output:'output', input:'input'}, options);
    const connector = { sourceNode: sourceNode.id, targetNode: targetNode.id, sourcePort: outputPort, targetPort: inputPort };
    console.log({connector});
    return this.application.Connectors.create(connector);
  }







  async execute(node, port='output'){
    if(!node) throw new Error('you must specify which node to execute');
    const output = await node.Execute.run(port);
    // console.log(`Output on port ${port} of node ${node.id}`, output)
    return output;
  }









  load(data){
   for (const collectionName in data) {
      this.application[collectionName].clear(true)
      data[collectionName].forEach(item=>this.application[collectionName].create(item))
   }

  }

  save(){
    const content = {
      Junctions: this.application.Junctions.content.map(o=>o.content),
      Nodes: this.application.Nodes.content.map(o=>o.content),
      //TODO: Order is significant atm, connectors must be last
      Connectors: this.application.Connectors.content.map(o=>o.content),
    }
    return content;
  }




}
